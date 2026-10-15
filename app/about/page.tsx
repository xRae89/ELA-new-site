import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand, Office, PageHero, Promises } from "@/components/sections";
import { ArrowLink, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "About the Firm",
  description:
    "Employment Law Assist is a California employment law firm that represents employees. Founded by Kasim Idrees, Esq. No win, no fee.",
};

const principles = [
  {
    title: "Experience on both sides",
    body: "Our founder spent years representing companies before switching sides. We know how employers defend these cases, and we build ours to beat that defense.",
  },
  {
    title: "Service you can reach",
    body: "Phones are answered 24/7, clients get direct lines, and you'll always know where your case stands.",
  },
  {
    title: "A full team on every file",
    body: "Attorneys, paralegals, and case managers work your case together, so nothing waits on one person's calendar.",
  },
  {
    title: "Moving quickly",
    body: "Evidence fades and deadlines run. We move fast from the first call to get your claim on file and in front of the other side.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="We represent employees. Only employees."
        lede="Employment Law Assist is a California firm built for one kind of client: the worker. Wage theft, wrongful firings, discrimination, harassment, retaliation. If it happened at work and it broke the law, we want to hear about it."
        crumbs={[{ label: "About" }]}
      />

      <section className="bg-paper">
        <div className="container-page grid gap-12 py-16 md:grid-cols-2 md:py-24">
          {principles.map((p) => (
            <div key={p.title} className="border-t-2 border-ink pt-6">
              <h2 className="font-wide text-2xl font-extrabold tracking-tight">{p.title}</h2>
              <p className="mt-3 max-w-[52ch] text-lg text-slate">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="container-page grid gap-12 py-20 md:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-20">
          <Image
            src="/images/kasim-headshot.jpg"
            alt="Kasim Idrees, Esq., founder and managing attorney"
            width={1024}
            height={1017}
            sizes="(min-width: 1024px) 34vw, 100vw"
            className="w-full rounded-[1.75rem] object-cover"
          />
          <div>
            <SectionHeading title="Meet our founder, Kasim Idrees, Esq." />
            <div className="mt-8 max-w-2xl space-y-5 text-lg text-ink/80">
              <p>
                Kasim spent the first part of his career on the other side of the table. Commercial litigation, private
                equity, banking, startups, restaurant franchising: he represented the businesses. Today he uses that
                inside view against them.
              </p>
              <p>
                His JD/MBA shows in how the firm runs. Cases are staffed by full teams, tracked closely, and moved
                quickly. But the part clients mention most is simpler: they can call Kasim directly, on his own
                cell.
              </p>
              <p>
                He also knows what being a good employer takes. Employment Law Assist has grown to more than 100
                people, and he runs it on the same rules he expects every other company to follow.
              </p>
            </div>
            <div className="mt-10">
              <ArrowLink href="/our-team">Meet the rest of the team</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink text-paper">
        <div className="container-page grid gap-12 py-20 md:py-24 lg:grid-cols-2 lg:items-center">
          <SectionHeading
            tone="light"
            title="No win, no fee. Guaranteed."
            intro="We handle every case on contingency. You pay nothing out of pocket, we cover case costs along the way, and if your case doesn't succeed for any reason, you owe us nothing."
          />
          <Promises tone="dark" />
        </div>
      </section>

      <Office />
      <CtaBand />
    </>
  );
}
