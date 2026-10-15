"use client";

/*
 * Chat shell originally adapted from 21st.dev "Agent Chat" (serafimcloud):
 * message list, auto-growing composer, send/stop states, error bubbles.
 * Restyled as a dark evergreen panel with marigold accents.
 */

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUp, Briefcase, Clock, DollarSign, Languages, Phone, Square, X } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { OPEN_CHAT_EVENT } from "./events";
import { FormattedText } from "./format";

type Msg = { id: string; role: "user" | "assistant"; content: string; error?: boolean };
type Status = "ready" | "submitted" | "streaming";

const suggestions = [
  { icon: Briefcase, label: "Was I fired illegally?" },
  { icon: Clock, label: "Do I get paid for missed breaks?" },
  { icon: DollarSign, label: "How much does it cost to hire you?" },
  { icon: Languages, label: "¿Hablan español?" },
];

const teasers = ["Was I fired illegally?", "Missed lunch breaks?", "Harassed at work?", "¿Hablan español?", "Ask us anything"];

let seq = 0;
const uid = () => `m${Date.now().toString(36)}${(seq++).toString(36)}`;

const lionMask: React.CSSProperties = {
  maskImage: "url(/images/icon.png)",
  WebkitMaskImage: "url(/images/icon.png)",
  maskSize: "contain",
  WebkitMaskSize: "contain",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
  maskPosition: "center",
};

function Lion({ className }: { className?: string }) {
  return <span aria-hidden className={cn("block bg-current", className)} style={lionMask} />;
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [status, setStatus] = useState<Status>("ready");
  const [draft, setDraft] = useState("");
  const [teaser, setTeaser] = useState(0);
  const abortRef = useRef<AbortController | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const busy = status !== "ready";

  const send = useCallback(
    async (text: string) => {
      const content = text.trim();
      if (!content || busy) return;
      const user: Msg = { id: uid(), role: "user", content };
      const assistant: Msg = { id: uid(), role: "assistant", content: "" };
      const history = [...messages.filter((m) => !m.error && m.content), user];
      setMessages((m) => [...m, user, assistant]);
      setDraft("");
      setStatus("submitted");

      const controller = new AbortController();
      abortRef.current = controller;
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history.map(({ role, content }) => ({ role, content })) }),
          signal: controller.signal,
        });
        if (!res.ok || !res.body) {
          const body = await res.json().catch(() => null);
          throw new Error(body?.error ?? `The assistant didn't respond. Call ${site.phone.display} to reach our team.`);
        }
        setStatus("streaming");
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        for (;;) {
          const { value, done } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          setMessages((m) => m.map((x) => (x.id === assistant.id ? { ...x, content: x.content + chunk } : x)));
        }
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setMessages((m) =>
            m.map((x) => (x.id === assistant.id ? { ...x, content: (err as Error).message, error: true } : x)),
          );
        }
      } finally {
        abortRef.current = null;
        setStatus("ready");
      }
    },
    [busy, messages],
  );

  const openChat = useCallback((prompt?: string) => {
    setOpen(true);
    if (prompt) setDraft(prompt);
    requestAnimationFrame(() => inputRef.current?.focus());
  }, []);

  useEffect(() => {
    const onOpen = (e: Event) => openChat((e as CustomEvent<string | undefined>).detail);
    window.addEventListener(OPEN_CHAT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, onOpen);
  }, [openChat]);

  // Cycle the launcher's teaser line while the panel is closed.
  useEffect(() => {
    if (open || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setTeaser((i) => (i + 1) % teasers.length), 2800);
    return () => clearInterval(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "0";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
    el.style.overflowY = el.scrollHeight > 120 ? "auto" : "hidden";
  }, [draft, open]);

  const answered = messages.some((m) => m.role === "assistant" && m.content && !m.error);

  return (
    <>
      <button
        type="button"
        onClick={() => openChat()}
        aria-label="Open chat with our AI assistant"
        className={cn(
          "group fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-full bg-signal py-2 pl-2 pr-5 text-ink shadow-[0_20px_45px_-12px_rgba(14,42,35,0.55)] transition-[transform,opacity] duration-300 hover:-translate-y-1 sm:bottom-6 sm:right-6",
          open && "pointer-events-none translate-y-6 scale-90 opacity-0",
        )}
      >
        <span className="relative grid size-10 place-items-center rounded-full bg-ink text-signal">
          <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-ink/40 [animation-duration:2.4s]" />
          <Lion className="relative size-5" />
        </span>
        <span className="relative h-5 w-[10.5rem] overflow-hidden text-left font-semibold">
          {teasers.map((t, i) => (
            <span
              key={t}
              aria-hidden={i !== teaser}
              className={cn(
                "absolute inset-0 truncate transition-[transform,opacity] duration-500 ease-[var(--ease-out-quint)]",
                i === teaser ? "translate-y-0 opacity-100" : i === (teaser + teasers.length - 1) % teasers.length ? "-translate-y-full opacity-0" : "translate-y-full opacity-0",
              )}
            >
              {t}
            </span>
          ))}
        </span>
      </button>

      <section
        role="dialog"
        aria-modal="false"
        aria-label="Chat with the Employment Law Assist AI assistant"
        hidden={!open}
        className={cn(
          "fixed z-50 flex origin-bottom-right flex-col overflow-hidden bg-ink text-paper",
          "inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[min(680px,calc(100svh-3rem))] sm:w-[420px] sm:rounded-[2rem] sm:shadow-[0_50px_120px_-30px_rgba(14,42,35,0.8)] sm:ring-1 sm:ring-white/10",
          open && "animate-pop",
        )}
      >
        {/* Slow-drifting marigold glow behind the header */}
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-28 size-80 animate-drift rounded-full bg-signal/25 blur-3xl" />

        <header className="relative flex items-start gap-3 px-6 pb-4 pt-6">
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-signal text-ink">
            <Lion className="size-6" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[1.05rem] font-bold leading-tight">Employment Law Assist</p>
            <p className="mt-1 flex items-center gap-1.5 text-[0.8125rem] text-dusk">
              <span className="relative flex size-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-signal/70" />
                <span className="relative size-2 rounded-full bg-signal" />
              </span>
              AI assistant, online now
            </p>
          </div>
          <a
            href={site.phone.href}
            aria-label={`Call ${site.phone.display}`}
            className="grid size-10 place-items-center rounded-full bg-white/5 transition-colors hover:bg-white/15"
          >
            <Phone className="size-[18px]" />
          </a>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            className="grid size-10 place-items-center rounded-full bg-white/5 transition-colors hover:bg-white/15"
          >
            <X className="size-5" />
          </button>
        </header>

        <div ref={listRef} className="relative flex-1 overflow-y-auto px-6 pb-6" aria-live="polite">
          {messages.length === 0 ? (
            <div className="pt-6">
              <h2 className="display text-[2.1rem] leading-[1.02]">
                What happened
                <br />
                at work?
              </h2>
              <p className="mt-3 max-w-[30ch] text-dusk">
                Ask anything about firings, breaks, pay, or harassment. Answers in seconds, in English or Spanish.
              </p>
              <div className="mt-7 grid grid-cols-2 gap-2.5">
                {suggestions.map(({ icon: Icon, label }, i) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => send(label)}
                    style={{ animationDelay: `${120 + i * 70}ms` }}
                    className="group flex animate-rise flex-col items-start gap-6 rounded-2xl bg-ink-2 p-4 text-left text-[0.92rem] font-medium leading-snug ring-1 ring-white/5 transition-[transform,background-color] duration-300 hover:-translate-y-1 hover:bg-ink-3"
                  >
                    <Icon aria-hidden className="size-5 text-signal transition-transform duration-300 group-hover:scale-110" />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-5 pt-2 text-[0.95rem] leading-relaxed">
              {messages.map((m) =>
                m.role === "user" ? (
                  <div key={m.id} className="flex animate-rise justify-end">
                    <p className="max-w-[85%] whitespace-pre-wrap break-words rounded-3xl rounded-br-lg bg-signal px-4 py-2.5 font-medium text-ink">
                      {m.content}
                    </p>
                  </div>
                ) : m.error ? (
                  <div key={m.id} className="animate-rise rounded-2xl bg-alert/20 px-4 py-3 text-sm ring-1 ring-alert/40">
                    <p className="font-semibold">Message not sent</p>
                    <p className="mt-0.5 text-dusk">{m.content}</p>
                  </div>
                ) : (
                  <div key={m.id} className="flex animate-rise gap-3">
                    <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-xl bg-ink-3 text-signal">
                      <Lion className="size-4" />
                    </span>
                    <div className="min-w-0 max-w-[88%] rounded-3xl rounded-tl-lg bg-ink-2 px-4 py-3 text-paper/90 ring-1 ring-white/5">
                      {m.content ? <FormattedText text={m.content} /> : <TypingDots />}
                    </div>
                  </div>
                ),
              )}

              {answered && status === "ready" && (
                <div className="grid animate-rise grid-cols-2 gap-2 pl-11">
                  <a
                    href={site.phone.href}
                    className="flex items-center justify-center gap-1.5 rounded-full bg-signal px-3 py-2.5 text-sm font-semibold text-ink hover:bg-signal-deep"
                  >
                    <Phone className="size-3.5" /> Call now
                  </a>
                  <Link
                    href="/contact-us#case-review"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center rounded-full px-3 py-2.5 text-sm font-semibold ring-1 ring-white/25 hover:bg-white/10"
                  >
                    Free case review
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="relative px-4 pb-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(draft);
            }}
            className="flex items-end gap-2 rounded-[1.4rem] bg-ink-2 py-2 pl-4 pr-2 ring-1 ring-white/10 transition-shadow focus-within:ring-2 focus-within:ring-signal/70"
          >
            <label htmlFor="chat-input" className="sr-only">
              Your question
            </label>
            <textarea
              id="chat-input"
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(draft);
                }
              }}
              rows={1}
              maxLength={2000}
              placeholder="Describe your situation…"
              className="max-h-[120px] flex-1 resize-none bg-transparent py-1.5 text-base leading-normal text-paper outline-none placeholder:text-mist"
            />
            {busy ? (
              <button
                type="button"
                onClick={() => abortRef.current?.abort()}
                aria-label="Stop response"
                className="grid size-10 shrink-0 place-items-center rounded-full bg-paper text-ink"
              >
                <Square className="size-3 fill-current" />
              </button>
            ) : (
              <button
                type="submit"
                aria-label="Send message"
                disabled={!draft.trim()}
                className="grid size-10 shrink-0 place-items-center rounded-full bg-signal text-ink transition-[transform,background-color] hover:scale-105 disabled:scale-100 disabled:bg-white/10 disabled:text-mist"
              >
                <ArrowUp className="size-4" strokeWidth={2.5} />
              </button>
            )}
          </form>
          <p className="mt-2.5 px-2 text-[0.7rem] leading-snug text-mist">
            AI-generated general information, not legal advice. Chatting doesn&rsquo;t create an attorney-client
            relationship.
          </p>
        </div>
      </section>
    </>
  );
}

function TypingDots() {
  return (
    <span className="flex h-6 items-center gap-1" aria-label="Assistant is typing">
      {[0, 1, 2].map((i) => (
        <span key={i} className="size-1.5 animate-bounce rounded-full bg-signal" style={{ animationDelay: `${i * 120}ms` }} />
      ))}
    </span>
  );
}
