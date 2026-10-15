import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections";
import { SectionHeading } from "@/components/ui";
import { culture, openings } from "@/lib/careers";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Employment Law Assist in Woodland Hills. Open roles for employment law attorneys and litigation paralegals, with monthly bonuses and real growth.",
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        title="Do work that changes someone's year."
        lede="We're a fast-growing plaintiff-side employment firm in Woodland Hills. Every case is a person who lost a job, a paycheck, or their sense of safety at work. We want people who take that seriously and like to win."
        crumbs={[{ label: "About", href: "/about" }, { label: "Careers" }]}
      />

      <section className="bg-paper">
        <div className="container-page py-16 md:py-24">
          <SectionHeading title="Open roles." />
          <ul className="mt-10 border-b border-line">
            {openings.map((o) => (
              <li key={o.slug} className="border-t border-line">
                <Link
                  href={`/careers/${o.slug}`}
                  className="group -mx-4 grid gap-3 rounded-2xl px-4 py-8 transition-colors hover:bg-ink hover:text-paper md:grid-cols-[1.2fr_1fr_auto] md:items-center md:gap-8"
                >
                  <span>
                    <span className="display block text-[clamp(1.75rem,3.4vw,2.75rem)]">{o.title}</span>
                    <span className="mt-2 block text-slate group-hover:text-dusk">
                      {o.location}, {o.type.toLowerCase()}
                    </span>
                  </span>
                  <span className="text-slate group-hover:text-dusk">{o.compensation}</span>
                  <ArrowUpRight aria-hidden className="hidden size-7 md:block" />
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-slate">
            Don&rsquo;t see your role? Send your resume to{" "}
            <a href={`mailto:${site.email}?subject=Careers`} className="font-semibold text-ink underline underline-offset-4">
              {site.email}
            </a>
            .
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-page grid gap-14 py-20 md:py-28 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <SectionHeading title="Why people stay." intro="A high bar, a lot of support, and growth that follows results." />
            <Image
              src="/images/office-wide.jpg"
              alt="The Employment Law Assist office in Woodland Hills"
              width={2000}
              height={1334}
              sizes="(min-width: 1024px) 36vw, 100vw"
              className="mt-10 aspect-[4/3] w-full rounded-[1.5rem] object-cover"
            />
          </div>
          <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {culture.map((c) => (
              <div key={c.title} className="border-t-2 border-ink pt-5">
                <h3 className="font-wide text-xl font-bold">{c.title}</h3>
                <p className="mt-2 text-slate">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
