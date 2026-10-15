import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { PageHero } from "@/components/sections";
import { ButtonLink } from "@/components/ui";
import { openings } from "@/lib/careers";
import { site } from "@/lib/site";

// Every param is prerendered by generateStaticParams; this only quiets the
// dev-time instant-navigation check for params read outside <Suspense>.
export const instant = false;

export function generateStaticParams() {
  return openings.map((o) => ({ role: o.slug }));
}

export async function generateMetadata({ params }: PageProps<"/careers/[role]">): Promise<Metadata> {
  const { role } = await params;
  const o = openings.find((x) => x.slug === role);
  return o ? { title: `${o.title} (${o.location})`, description: o.summary } : {};
}

export default async function RolePage({ params }: PageProps<"/careers/[role]">) {
  const { role } = await params;
  const o = openings.find((x) => x.slug === role);
  if (!o) notFound();

  const apply = `mailto:${site.email}?subject=${encodeURIComponent(`Application: ${o.title}`)}`;

  return (
    <>
      <PageHero
        title={o.title}
        lede={o.summary}
        crumbs={[{ label: "Careers", href: "/careers" }, { label: o.title }]}
      >
        <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
          {[
            ["Location", o.location],
            ["Type", o.type],
            ["Compensation", o.compensation],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-sm text-slate">{k}</dt>
              <dd className="font-semibold">{v}</dd>
            </div>
          ))}
        </dl>
        <ButtonLink href={apply} className="mt-8">
          Apply by email
        </ButtonLink>
      </PageHero>
      <section className="bg-paper">
        <div className="container-page grid gap-14 py-16 md:grid-cols-3 md:py-24">
          {[
            ["What you'll do", o.responsibilities],
            ["What we're looking for", o.requirements],
            ["Why join us", o.perks],
          ].map(([title, items]) => (
            <div key={title as string}>
              <h2 className="font-wide text-2xl font-extrabold tracking-tight">{title as string}</h2>
              <ul className="mt-6 space-y-3">
                {(items as string[]).map((it) => (
                  <li key={it} className="flex gap-3 text-ink/85">
                    <Check aria-hidden className="mt-1 size-4 shrink-0 text-palm" strokeWidth={3} />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="container-page pb-24">
          <div className="flex flex-col items-start justify-between gap-6 rounded-[1.5rem] bg-ink p-8 text-paper md:flex-row md:items-center md:p-10">
            <p className="font-wide text-2xl font-bold">Send your resume and a few lines about why you&rsquo;re a fit.</p>
            <ButtonLink href={apply} variant="paper">
              Apply by email
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
