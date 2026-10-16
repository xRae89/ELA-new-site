"use client";

import Link from "next/link";
import { useId } from "react";
import { Lock } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function IntakeForm({ className, title = "Tell us what happened" }: { className?: string; title?: string }) {
  const id = useId();

  return (
    <form
      id="case-review"
      action="https://api.web3forms.com/submit"
      method="POST"
      className={cn("rounded-[1.75rem] bg-white p-6 text-ink shadow-[0_30px_80px_-30px_rgba(14,42,35,0.45)] sm:p-8", className)}
    >
      <input type="hidden" name="access_key" value={process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY} />
      <input type="hidden" name="subject" value="New case review request" />
      <input type="hidden" name="from_name" value={site.legalName} />
      <input
        type="hidden"
        name="redirect"
        value={`${process.env.NEXT_PUBLIC_SITE_URL ?? "https://employmentlawassist.com"}/thank-you`}
      />

      <h2 className="font-wide text-2xl font-extrabold tracking-tight">{title}</h2>
      <p className="mt-2 text-[0.95rem] text-slate">
        Free and confidential. An intake specialist will reach out, usually the same day.
      </p>

      <div className="mt-6 grid gap-4">
        <Field id={`${id}-name`} label="Full name">
          <input
            id={`${id}-name`}
            name="name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={120}
            className={inputCls()}
          />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id={`${id}-phone`} label="Phone">
            <input
              id={`${id}-phone`}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              pattern="[0-9\s()+.-]{7,20}"
              className={inputCls()}
            />
          </Field>
          <Field id={`${id}-email`} label="Email">
            <input
              id={`${id}-email`}
              name="email"
              type="email"
              autoComplete="email"
              required
              className={inputCls()}
            />
          </Field>
        </div>
        <Field id={`${id}-story`} label="What happened?" hint="A few sentences is plenty.">
          <textarea id={`${id}-story`} name="message" rows={4} maxLength={4000} className={cn(inputCls(), "resize-y")} />
        </Field>

        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor={`${id}-botcheck`}>Company</label>
          <input id={`${id}-botcheck`} type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" />
        </div>

        <label className="flex items-start gap-3 text-[0.8125rem] leading-snug text-slate">
          <input
            type="checkbox"
            name="consent"
            required
            className="mt-0.5 size-4 shrink-0 accent-[var(--color-palm)]"
          />
          <span>
            I agree to the{" "}
            <Link href="/terms-and-conditions" className="underline">
              terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy-policy" className="underline">
              privacy policy
            </Link>
            , and to receive calls and texts from {site.legalName} about my case. Opt out any time.
          </span>
        </label>
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-signal px-6 py-4 font-semibold text-ink transition-colors hover:bg-signal-deep"
      >
        Send my case for review
      </button>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-slate">
        <Lock aria-hidden className="size-3" /> Your information stays confidential.
      </p>
    </form>
  );
}

function inputCls() {
  return cn(
    "mt-1.5 block w-full rounded-xl border bg-paper/60 px-4 py-3 text-base text-ink outline-none transition-colors placeholder:text-mist focus:border-ink focus:bg-white",
    "border-line",
  );
}

function Field({
  id,
  label,
  hint,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between text-sm font-semibold">
        {label}
        {hint && <span className="font-normal text-slate">{hint}</span>}
      </label>
      {children}
    </div>
  );
}
