import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/** The firm's lion-shield wordmark, recolorable through `currentColor`. */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label={site.name}
      className={cn("block aspect-[2474/585] bg-current", className)}
      style={{
        maskImage: "url(/images/logo-white.png)",
        WebkitMaskImage: "url(/images/logo-white.png)",
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
      }}
    />
  );
}

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[0.975rem] font-semibold leading-none transition-colors duration-200 whitespace-nowrap";

const variants = {
  signal: "bg-signal text-ink hover:bg-signal-deep",
  ink: "bg-ink text-paper hover:bg-ink-3",
  outline: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper",
  ghostLight: "border border-paper/30 text-paper hover:border-paper hover:bg-paper hover:text-ink",
  paper: "bg-paper text-ink hover:bg-white",
} as const;

export type ButtonVariant = keyof typeof variants;

export function ButtonLink({
  href,
  variant = "signal",
  className,
  children,
}: {
  href: string;
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
}) {
  const cls = cn(buttonBase, variants[variant], className);
  if (href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function CallButton({ variant = "outline", className }: { variant?: ButtonVariant; className?: string }) {
  return (
    <ButtonLink href={site.phone.href} variant={variant} className={className}>
      <Phone aria-hidden className="size-4" strokeWidth={2.25} />
      Call {site.phone.display}
    </ButtonLink>
  );
}

export function ReviewButton({ variant = "signal", className }: { variant?: ButtonVariant; className?: string }) {
  return (
    <ButtonLink href="/contact-us#case-review" variant={variant} className={className}>
      Start a free case review
    </ButtonLink>
  );
}

export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-1.5 font-semibold underline decoration-current/30 underline-offset-[6px] transition-colors hover:decoration-current",
        className,
      )}
    >
      {children}
      <ArrowUpRight
        aria-hidden
        className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </Link>
  );
}

export function SectionHeading({
  title,
  intro,
  className,
  tone = "dark",
}: {
  title: React.ReactNode;
  intro?: React.ReactNode;
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <h2 className="display text-[clamp(2rem,4.6vw,3.6rem)]">{title}</h2>
      {intro && (
        <p className={cn("mt-5 max-w-2xl text-lg", tone === "dark" ? "text-slate" : "text-mist")}>{intro}</p>
      )}
    </div>
  );
}
