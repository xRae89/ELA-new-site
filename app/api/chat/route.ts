import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { offlineReply, SYSTEM_PROMPT } from "@/lib/chat";
import { site } from "@/lib/site";

export const maxDuration = 60;

const MODEL = process.env.CHAT_MODEL ?? "claude-opus-5-5";

const Body = z.object({
  messages: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().trim().min(1).max(2000) }))
    .min(1)
    .max(30)
    .refine((m) => m[0].role === "user" && m[m.length - 1].role === "user", "Conversation must start and end with a user turn."),
});

// Best-effort per-instance limiter so one visitor can't run up the bill. Not a
// security boundary across serverless instances.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 25;
}

const encoder = new TextEncoder();

function textStream(write: (push: (s: string) => void) => Promise<void>) {
  return new Response(
    new ReadableStream({
      async start(controller) {
        await write((s) => controller.enqueue(encoder.encode(s)));
        controller.close();
      },
    }),
    { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } },
  );
}

/** Streams a canned answer in small pieces so it reads like the live model. */
function offline(answer: string) {
  return textStream(async (push) => {
    for (const word of answer.split(/(\s+)/)) {
      push(word);
      await new Promise((r) => setTimeout(r, 12));
    }
  });
}

const fallbackNote = `I couldn't answer that just now. Please call ${site.phone.display}, answered 24/7, or start a free case review at /contact-us#case-review.`;

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (limited(ip)) {
    return Response.json(
      { error: `You've sent a lot of messages. Please call ${site.phone.display} to keep talking with our team.` },
      { status: 429 },
    );
  }

  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ error: "Messages were missing or too long. Shorten your message and try again." }, { status: 400 });
  }
  const { messages } = parsed.data;

  if (!process.env.ANTHROPIC_API_KEY) {
    return offline(offlineReply(messages[messages.length - 1].content));
  }

  const client = new Anthropic();

  return textStream(async (push) => {
    let wrote = false;
    try {
      const stream = client.beta.messages.stream({
        model: MODEL,
        max_tokens: 4096,
        system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
        messages,
        output_config: { effort: "low" },
        betas: ["server-side-fallback-2026-07-01"],
        fallbacks: "default",
      });

      for await (const event of stream) {
        if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
          wrote = true;
          push(event.delta.text);
        }
      }

      const final = await stream.finalMessage();
      if (final.stop_reason === "refusal" && !wrote) push(fallbackNote);
      else if (final.stop_reason === "max_tokens") push("…");
    } catch (err) {
      if (err instanceof Anthropic.RateLimitError) {
        push(wrote ? "" : `Our assistant is busy right now. ${fallbackNote}`);
      } else if (err instanceof Anthropic.APIError) {
        console.error("chat api error", err.status, err.message);
        push(wrote ? "" : fallbackNote);
      } else {
        console.error("chat error", err);
        push(wrote ? "" : fallbackNote);
      }
    }
  });
}
