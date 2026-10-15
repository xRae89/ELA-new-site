import type { Metadata } from "next";
import { CtaBand, PageHero } from "@/components/sections";
import { ReviewButton } from "@/components/ui";
import { reviews } from "@/lib/people";

export const metadata: Metadata = {
  title: "Client Reviews",
  description: "What clients say about working with Employment Law Assist, from the first call through settlement.",
};

export default function ReviewsPage() {
  return (
    <>
      <PageHero
        title="In our clients' words."
        lede="Excerpts from reviews clients have left about working with Kasim and the team."
        crumbs={[{ label: "About", href: "/about" }, { label: "Reviews" }]}
      >
        <div className="mt-8">
          <ReviewButton />
        </div>
      </PageHero>
      <section className="bg-paper">
        <div className="container-page py-16 md:py-24">
          <ul className="columns-1 gap-4 md:columns-2 xl:columns-3">
            {reviews.map((r, i) => (
              <li
                key={r.name}
                className={
                  i % 5 === 0
                    ? "mb-4 break-inside-avoid rounded-[1.5rem] bg-ink p-8 text-paper"
                    : "mb-4 break-inside-avoid rounded-[1.5rem] bg-white p-8 ring-1 ring-line"
                }
              >
                <figure>
                  <blockquote className="font-serif text-2xl italic leading-snug">&ldquo;{r.quote}&rdquo;</blockquote>
                  <figcaption className="mt-6 font-semibold">{r.name}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
