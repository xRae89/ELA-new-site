"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { Lock } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Errors = Partial<Record<"name" | "email" | "phone" | "story" | "consent" | "form", string>>;

interface Web3FormsResponse {
  success?: boolean;
  message?: string;
  body?: Web3FormsBody;
}

interface Web3FormsBody {
  message?: string;
}

export function IntakeForm({ className, title = "Tell us what happened" }: { className?: string; title?: string }) {
  const router = useRouter();
  const id = useId();
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setErrors({});

    const fieldErrors = validateForm(data);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim();
    if (!accessKey) {
      setErrors({ form: "The case review form is temporarily unavailable. Please call us instead." });
      return;
    }

    setPending(true);
    const payload = {
      access_key: accessKey,
      subject: "New case review request",
      from_name: site.legalName,
      name: getField(data, "name"),
      email: getField(data, "email"),
      phone: getField(data, "phone"),
      message: getField(data, "story"),
      botcheck: data.get("botcheck") === "on",
    };

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => null);
    const body = await response?.json().catch(() => null) as unknown;
    setPending(false);

    if (response?.ok && isWeb3FormsResponse(body) && body.success === true) {
      router.push("/thank-you");
      return;
    }

    setErrors({ form: getWeb3FormsError(body) ?? `We couldn't send that. Please call ${site.phone.display}.` });
  }

  return (
    <form
      id="case-review"
      onSubmit={onSubmit}
      noValidate
      className={cn("rounded-[1.75rem] bg-white p-6 text-ink shadow-[0_30px_80px_-30px_rgba(14,42,35,0.45)] sm:p-8", className)}
    >
      <h2 className="font-wide text-2xl font-extrabold tracking-tight">{title}</h2>
      <p className="mt-2 text-[0.95rem] text-slate">
        Free and confidential. An intake specialist will reach out, usually the same day.
      </p>

      <div className="mt-6 grid gap-4">
        <Field id={`${id}-name`} label="Full name" error={errors.name}>
          <input id={`${id}-name`} name="name" autoComplete="name" required className={inputCls(errors.name)} />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id={`${id}-phone`} label="Phone" error={errors.phone}>
            <input
              id={`${id}-phone`}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              className={inputCls(errors.phone)}
            />
          </Field>
          <Field id={`${id}-email`} label="Email" error={errors.email}>
            <input
              id={`${id}-email`}
              name="email"
              type="email"
              autoComplete="email"
              required
              className={inputCls(errors.email)}
            />
          </Field>
        </div>
        <Field id={`${id}-story`} label="What happened?" hint="A few sentences is plenty." error={errors.story}>
          <textarea id={`${id}-story`} name="story" rows={4} className={cn(inputCls(errors.story), "resize-y")} />
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
            aria-invalid={!!errors.consent}
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
        {errors.consent && <p className="-mt-2 text-sm font-medium text-alert">{errors.consent}</p>}
      </div>

      {errors.form && (
        <p role="alert" className="mt-4 rounded-xl bg-alert/10 px-4 py-3 text-sm font-medium text-alert">
          {errors.form}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-signal px-6 py-4 font-semibold text-ink transition-colors hover:bg-signal-deep disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send my case for review"}
      </button>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-slate">
        <Lock aria-hidden className="size-3" /> Your information stays confidential.
      </p>
    </form>
  );
}

function getField(data: FormData, name: string) {
  const value = data.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function validateForm(data: FormData): Errors {
  const errors: Errors = {};
  const name = getField(data, "name");
  const email = getField(data, "email");
  const phone = getField(data, "phone");
  const story = getField(data, "story");

  if (name.length < 2) errors.name = "Enter your name.";
  if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = "Enter a valid email address.";
  if (!/^[\d\s()+.-]{7,20}$/.test(phone)) errors.phone = "Enter a valid phone number.";
  if (story.length > 4000) errors.story = "Keep your story under 4,000 characters.";
  if (data.get("consent") !== "on") errors.consent = "Please agree to the terms to continue.";
  if (getField(data, "botcheck")) errors.form = "We couldn't send that. Please try again.";

  return errors;
}

function isWeb3FormsResponse(value: unknown): value is Web3FormsResponse {
  return typeof value === "object" && value !== null;
}

function getWeb3FormsError(value: unknown) {
  if (!isWeb3FormsResponse(value)) return null;
  if (typeof value.message === "string") return value.message;
  if (typeof value.body?.message === "string") return value.body.message;
  return null;
}

function inputCls(error?: string) {
  return cn(
    "mt-1.5 block w-full rounded-xl border bg-paper/60 px-4 py-3 text-base text-ink outline-none transition-colors placeholder:text-mist focus:border-ink focus:bg-white",
    error ? "border-alert" : "border-line",
  );
}

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between text-sm font-semibold">
        {label}
        {hint && <span className="font-normal text-slate">{hint}</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-sm font-medium text-alert">{error}</p>}
    </div>
  );
}
