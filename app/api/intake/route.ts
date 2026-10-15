import { z } from "zod";

const Intake = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(120),
  email: z.email("Enter a valid email address.").max(200),
  phone: z
    .string()
    .trim()
    .regex(/^[\d\s()+.-]{7,20}$/, "Enter a valid phone number."),
  story: z.string().trim().max(4000).optional().default(""),
  consent: z.literal(true, { error: "Please agree to the terms to continue." }),
  // Honeypot: real people never see or fill this field.
  company: z.string().max(0).optional(),
});

export async function POST(req: Request) {
  const parsed = Intake.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    const fieldErrors = Object.fromEntries(parsed.error.issues.map((i) => [String(i.path[0]), i.message]));
    return Response.json({ ok: false, fieldErrors }, { status: 400 });
  }

  const { name, email, phone, story } = parsed.data;
  const payload = { name, email, phone, story, source: "website", receivedAt: new Date().toISOString() };

  // Leads go to whatever the firm's intake team uses (Zapier, Make, a CRM, or
  // a Slack incoming webhook). Until that's configured, they're logged.
  const webhook = process.env.INTAKE_WEBHOOK_URL;
  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => null);
    if (!res?.ok) {
      return Response.json(
        { ok: false, error: "We couldn't send your case review. Please call (424) 234-5229 instead." },
        { status: 502 },
      );
    }
  } else {
    console.info("intake (no INTAKE_WEBHOOK_URL set)", { ...payload, story: `${payload.story.length} chars` });
  }

  return Response.json({ ok: true });
}
