import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, MapPin, Plus } from "lucide-react";
import type { QA } from "@/lib/practice-areas";
import { practiceAreas } from "@/lib/practice-areas";
import { locationHref, regions } from "@/lib/regions";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { OpenChatButton } from "./chat/open-chat-button";
import { Reveal } from "./motion";
import { ArrowLink, ButtonLink, CallButton, ReviewButton, SectionHeading } from "./ui";

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-slate">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <li>
          <Link href="/" className="hover:text-ink hover:underline">
            Home
          </Link>
        </li>
        {items.map((it) => (
          <li key={it.label} className="flex items-center gap-2">
            <span aria-hidden className="text-mist">/</span>
            {it.href ? (
              <Link href={it.href} className="hover:text-ink hover:underline">
                {it.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink">
                {it.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({
  title,
  lede,
  crumbs,
  children,
  aside,
}: {
  title: React.ReactNode;
  lede?: React.ReactNode;
  crumbs: { label: string; href?: string }[];
  children?: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <section className="border-b border-line bg-paper-2">
      <div className={cn("container-page py-12 md:py-20", aside && "grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-end")}>
        <div>
          <Breadcrumbs items={crumbs} />
          <h1 className="display mt-6 text-[clamp(2.4rem,6vw,5rem)]">{title}</h1>
          {lede && <p className="mt-6 max-w-2xl text-lg text-slate md:text-xl">{lede}</p>}
          {children}
        </div>
        {aside}
      </div>
    </section>
  );
}

export function PracticeList({ className }: { className?: string }) {
  return (
    <ul className={cn("border-b border-line", className)}>
      {practiceAreas.map((p, i) => (
        <Reveal as="li" key={p.slug} delay={i * 80} className="border-t border-line">
          <Link
            href={`/${p.slug}`}
            className="group -mx-4 grid items-center gap-2 rounded-2xl px-4 py-7 transition-colors duration-300 hover:bg-ink hover:text-paper md:grid-cols-[1.2fr_1fr_auto] md:gap-8 md:py-9"
          >
            <span className="display text-[clamp(1.85rem,3.8vw,3.25rem)] transition-transform duration-300 group-hover:translate-x-2">{p.name}</span>
            <span className="text-slate transition-colors group-hover:text-dusk md:text-lg">{p.short}</span>
            <ArrowUpRight
              aria-hidden
              className="hidden size-8 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:rotate-45 group-hover:text-signal md:block"
            />
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}

const steps = [
  {
    title: "Call or send your story",
    body: `Call ${site.phone.display} any time, or use the form. It takes about five minutes.`,
  },
  {
    title: "Talk it through with us",
    body: "We'll ask what happened, look at your timeline, and tell you honestly whether you have a claim.",
  },
  {
    title: "We go after what you're owed",
    body: "If we take your case, we handle everything. You pay nothing unless we recover money for you.",
  },
];

export function Steps() {
  return (
    <section className="bg-white">
      <div className="container-page py-20 md:py-28">
        <Reveal>
          <SectionHeading title="Getting help takes three steps." />
        </Reveal>
        <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 140} className="group border-t-2 border-ink pt-6">
              <span aria-hidden className="display block text-[4.5rem] leading-none text-accent-ink transition-transform duration-500 group-hover:-translate-y-2">
                {i + 1}
              </span>
              <h3 className="mt-5 font-wide text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-slate">{s.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function ServiceAreas() {
  return (
    <section className="bg-ink text-paper">
      <div className="container-page py-20 md:py-28">
        <Reveal>
          <SectionHeading
            tone="light"
            title="Representing employees across Southern California."
            intro="Based in Woodland Hills, we take cases throughout the state. These are the regions we see most often."
          />
        </Reveal>
        <div className="mt-14 grid gap-px overflow-hidden rounded-[1.75rem] bg-paper/10 sm:grid-cols-2 lg:grid-cols-3">
          {regions.map((r, i) => (
            <Reveal key={r.id} delay={(i % 3) * 100} className="bg-ink p-7 transition-colors duration-300 hover:bg-ink-2 md:p-8">
              <h3 className="font-wide text-2xl font-extrabold tracking-tight">{r.name}</h3>
              <p className="mt-2 text-sm text-mist">{r.cities.slice(0, 5).join(", ")}</p>
              <ul className="mt-6 space-y-2">
                {(["wrongful-termination", "retaliation", "discrimination"] as const).map((t) => (
                  <li key={t}>
                    <Link
                      href={locationHref(r.id, t)}
                      className="group flex items-center justify-between border-b border-paper/10 pb-2 text-dusk transition-colors hover:text-paper"
                    >
                      {t === "wrongful-termination" ? "Wrongful termination" : t === "retaliation" ? "Retaliation" : "Discrimination"}
                      <ArrowUpRight aria-hidden className="size-4 opacity-50 transition group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Office({ title = "Come see us in Woodland Hills." }: { title?: string }) {
  return (
    <section id="office" className="bg-paper">
      <div className="container-page grid gap-10 py-20 md:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal className="relative overflow-hidden rounded-[1.75rem] bg-paper-2">
          <Image
            src="/images/office-portrait.jpg"
            alt="The Employment Law Assist, APC building entrance on Ventura Boulevard, framed by palm trees"
            width={1035}
            height={1334}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-quint)] hover:scale-[1.04]"
          />
        </Reveal>
        <div className="flex flex-col">
          <SectionHeading title={title} intro="Our office sits on Ventura Boulevard in the West San Fernando Valley, with parking out front." />
          <dl className="mt-10 grid gap-x-8 gap-y-6 border-t border-line pt-8 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-slate">Address</dt>
              <dd className="mt-1 text-lg font-semibold">
                {site.address.street}
                <br />
                {site.address.city}, {site.address.region} {site.address.postalCode}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-slate">Phone, 24/7</dt>
              <dd className="mt-1">
                <a href={site.phone.href} className="font-wide text-2xl font-bold hover:text-accent-ink">
                  {site.phone.display}
                </a>
              </dd>
              <dt className="mt-4 text-sm text-slate">Email</dt>
              <dd className="mt-1">
                <a href={`mailto:${site.email}`} className="font-semibold hover:underline">
                  {site.email}
                </a>
              </dd>
            </div>
          </dl>
          <p className="mt-6 text-slate">Prefer to meet in person? Call ahead and we&rsquo;ll set a time.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href={site.address.mapsUrl} variant="ink">
              <MapPin aria-hidden className="size-4" /> Get directions
            </ButtonLink>
            <CallButton />
          </div>
          <div className="mt-8 min-h-72 flex-1 overflow-hidden rounded-[1.75rem] border border-line bg-paper-2">
            <iframe
              title="Map to Employment Law Assist, 21731 Ventura Blvd., Suite 205, Woodland Hills"
              src={site.address.embedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-72 w-full grayscale-[35%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Accordion({ items, className }: { items: QA[]; className?: string }) {
  return (
    <div className={cn("border-b border-line", className)}>
      {items.map((f) => (
        <details key={f.q} className="group border-t border-line">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-lg font-semibold md:text-xl">
            {f.q}
            <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-paper-2 transition-colors group-open:bg-ink group-open:text-paper">
              <Plus aria-hidden className="size-4 transition-transform duration-300 group-open:rotate-45" />
            </span>
          </summary>
          <p className="-mt-1 max-w-[62ch] pb-7 pr-12 text-slate">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function FaqSection({ items }: { items: QA[] }) {
  return (
    <section className="bg-white">
      <div className="container-page grid gap-12 py-20 md:py-28 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
        <div className="lg:sticky lg:top-36 lg:self-start">
          <SectionHeading
            title="Questions people ask us first."
            intro="Straight answers to what clients ask in their first call. Don't see yours? Ask our assistant, or call us."
          />
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <ButtonLink href="/faq" variant="ink">
              See all questions
            </ButtonLink>
            <OpenChatButton />
          </div>
        </div>
        <Accordion items={items} />
      </div>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-paper">
      <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 -z-10 size-[34rem] animate-drift rounded-full bg-signal/20 blur-3xl" />
      <div className="container-page py-20 md:py-28">
        <p className="max-w-xl text-lg text-dusk">Talk to someone today. The consultation is free, and so is the call.</p>
        <a
          href={site.phone.href}
          className="display mt-4 block whitespace-nowrap text-[clamp(2rem,8.4vw,7.5rem)] transition-colors duration-300 hover:text-signal"
        >
          {site.phone.display}
        </a>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <ReviewButton />
          <ButtonLink href="/contact-us" variant="ghostLight">
            Other ways to reach us
          </ButtonLink>
          <OpenChatButton className="ml-2 text-paper" />
        </div>
      </div>
    </section>
  );
}

export function Promises({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {site.promises.map((p) => (
        <li key={p} className="flex items-center gap-3 font-semibold">
          <span
            className={cn(
              "grid size-7 shrink-0 place-items-center rounded-full",
              tone === "light" ? "bg-palm text-white" : "bg-signal/15 text-accent-ink",
            )}
          >
            <Check aria-hidden className="size-4" strokeWidth={3} />
          </span>
          <span lang={p.startsWith("Hablamos") ? "es" : undefined}>{p}</span>
        </li>
      ))}
    </ul>
  );
}

export function RelatedLinks({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="font-wide text-sm font-bold">{title}</p>
      <ul className="mt-3 space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <ArrowLink href={l.href} className="font-medium">
              {l.label}
            </ArrowLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
