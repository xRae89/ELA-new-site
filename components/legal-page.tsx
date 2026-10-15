import { PageHero } from "./sections";

export function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: { heading: string; body: string[] }[];
}) {
  return (
    <>
      <PageHero title={title} crumbs={[{ label: title }]} lede={`Last updated ${updated}.`} />
      <section className="bg-paper">
        <div className="container-page max-w-4xl space-y-10 py-16 md:py-24">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="font-wide text-xl font-bold">{s.heading}</h2>
              {s.body.map((p) => (
                <p key={p} className="mt-3 max-w-[70ch] text-ink/80">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
