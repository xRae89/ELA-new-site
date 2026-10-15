import { Check } from "lucide-react";
import type { Section } from "@/lib/practice-areas";
import { IntakeForm } from "./intake-form";

export function ArticleSections({ sections }: { sections: Section[] }) {
  return (
    <div className="space-y-14">
      {sections.map((s) => (
        <section key={s.heading}>
          <h2 className="font-wide text-[clamp(1.6rem,2.6vw,2.15rem)] font-extrabold leading-tight tracking-tight">
            {s.heading}
          </h2>
          {s.body?.map((p) => (
            <p key={p} className="mt-4 max-w-[68ch] text-lg text-ink/80">
              {p}
            </p>
          ))}
          {s.list && (
            <ul className="mt-6 grid gap-3">
              {s.list.map((li) => (
                <li key={li} className="flex gap-3 text-lg text-ink/85">
                  <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-palm" />
                  <span className="max-w-[64ch]">{li}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}

export function RecoverCard({ items, deadline }: { items: string[]; deadline: string }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <div className="rounded-[1.5rem] bg-ink p-7 text-paper md:p-9">
        <h2 className="font-wide text-xl font-bold">What you may be able to recover</h2>
        <ul className="mt-6 space-y-3">
          {items.map((r) => (
            <li key={r} className="flex gap-3 text-dusk">
              <Check aria-hidden className="mt-1 size-4 shrink-0 text-signal" strokeWidth={3} />
              {r}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-[1.5rem] border-2 border-signal bg-white p-7 md:p-9">
        <h2 className="font-wide text-xl font-bold">How long you have</h2>
        <p className="mt-4 text-ink/80">{deadline}</p>
        <p className="mt-4 text-sm text-slate">
          Deadlines depend on the facts of your case. The safest move is to call while you still have every option.
        </p>
      </div>
    </div>
  );
}

/** Two-column body: article on the left, sticky case-review form on the right. */
export function ArticleLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-page grid gap-14 py-16 md:py-24 lg:grid-cols-[1fr_24rem] lg:gap-16 xl:grid-cols-[1fr_26rem]">
      <div className="min-w-0">{children}</div>
      <aside className="lg:sticky lg:top-32 lg:self-start">
        <IntakeForm title="Free case review" className="shadow-[0_24px_60px_-30px_rgba(14,42,35,0.35)] ring-1 ring-line" />
      </aside>
    </div>
  );
}
