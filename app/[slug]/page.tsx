import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import { ArticleLayout, ArticleSections, RecoverCard } from "@/components/article";
import { Accordion, CtaBand, PageHero, Promises, RelatedLinks } from "@/components/sections";
import { OpenChatButton } from "@/components/chat/open-chat-button";
import { ArrowLink, CallButton } from "@/components/ui";
import { getPracticeArea, practiceAreas } from "@/lib/practice-areas";
import { locationHref, locationPages, regions } from "@/lib/regions";

// Every param is prerendered by generateStaticParams; this only quiets the
// dev-time instant-navigation check for params read outside <Suspense>.
export const instant = false;

export function generateStaticParams() {
  return [...practiceAreas.map((p) => ({ slug: p.slug })), ...locationPages.map((l) => ({ slug: l.slug }))];
}

function resolve(slug: string) {
  const area = getPracticeArea(slug);
  if (area) return { kind: "area" as const, area };
  const loc = locationPages.find((l) => l.slug === slug);
  if (loc) return { kind: "location" as const, ...loc };
  return null;
}

export async function generateMetadata({ params }: PageProps<"/[slug]">): Promise<Metadata> {
  const page = resolve((await params).slug);
  if (!page) return {};
  if (page.kind === "area") {
    return {
      title: `${page.area.topic} Lawyers in California`,
      description: page.area.metaDescription,
      alternates: { canonical: `/${page.area.slug}` },
    };
  }
  return {
    title: `${page.region.name} ${page.area.topic} Attorney`,
    description: `${page.region.name} ${page.area.topic.toLowerCase()} lawyers for employees in ${page.region.cities
      .slice(0, 4)
      .join(", ")}, and across ${page.region.county}. No fee unless we win. Free consultation, 24/7.`,
    alternates: { canonical: `/${page.slug}` },
  };
}

export default async function ContentPage({ params }: PageProps<"/[slug]">) {
  const page = resolve((await params).slug);
  if (!page) notFound();

  const { area } = page;
  const isLocation = page.kind === "location";
  const title = isLocation ? `${page.region.name} ${area.topic.toLowerCase()} lawyers` : `${area.topic} lawyers`;

  return (
    <>
      <PageHero
        title={title}
        lede={area.lede}
        crumbs={
          isLocation
            ? [{ label: "Service areas", href: "/practice-areas#service-areas" }, { label: `${page.region.name}` }]
            : [{ label: "Practice areas", href: "/practice-areas" }, { label: area.name }]
        }
      >
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <CallButton variant="ink" />
          <ArrowLink href="#case-review">Free case review</ArrowLink>
          <OpenChatButton prompt={`I have a question about ${area.name.toLowerCase()}: `} />
        </div>
      </PageHero>

      <ArticleLayout>
        {isLocation && (
          <section className="mb-14 rounded-[1.5rem] bg-white p-7 ring-1 ring-line md:p-9">
            <p className="flex items-center gap-2 text-sm font-semibold text-accent-ink">
              <MapPin aria-hidden className="size-4" /> {page.region.county}
            </p>
            <h2 className="mt-3 font-wide text-[clamp(1.5rem,2.4vw,2rem)] font-extrabold leading-tight tracking-tight">
              Representing {page.region.name} employees
            </h2>
            <p className="mt-4 max-w-[68ch] text-lg text-ink/80">{page.region.note}</p>
            <p className="mt-4 text-ink/80">
              Cases here are typically filed in the {page.region.court}, or in arbitration when an employer requires
              it. That includes workers in {page.region.cities.join(", ")}.
            </p>
          </section>
        )}

        <ArticleSections sections={area.sections} />

        <div className="mt-16">
          <RecoverCard items={area.recover} deadline={area.deadline} />
        </div>

        <div className="mt-16 rounded-[1.5rem] bg-paper-2 p-7 md:p-9">
          <h2 className="font-wide text-xl font-bold">How we work</h2>
          <div className="mt-6">
            <Promises />
          </div>
        </div>

        <section className="mt-16">
          <h2 className="font-wide text-[clamp(1.6rem,2.6vw,2.15rem)] font-extrabold tracking-tight">Common questions</h2>
          <Accordion items={area.faqs} className="mt-6" />
        </section>

        <div className="mt-16 grid gap-10 sm:grid-cols-2">
          <RelatedLinks
            title="Other practice areas"
            links={practiceAreas.filter((p) => p.slug !== area.slug).map((p) => ({ label: p.name, href: `/${p.slug}` }))}
          />
          {isLocation ? (
            <RelatedLinks
              title={`${area.name} in other regions`}
              links={regions
                .filter((r) => r.id !== page.region.id)
                .map((r) => ({
                  label: r.name,
                  href: locationHref(r.id, area.slug as "wrongful-termination" | "retaliation" | "discrimination"),
                }))}
            />
          ) : (
            locationPages.some((l) => l.area.slug === area.slug) && (
              <RelatedLinks
                title="By region"
                links={locationPages
                  .filter((l) => l.area.slug === area.slug)
                  .map((l) => ({ label: l.region.name, href: `/${l.slug}` }))}
              />
            )
          )}
        </div>
      </ArticleLayout>

      <CtaBand />
    </>
  );
}
