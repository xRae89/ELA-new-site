import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand, PageHero } from "@/components/sections";
import { ArrowLink } from "@/components/ui";
import { team, type TeamMember } from "@/lib/people";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the attorneys, paralegals, and case managers at Employment Law Assist who represent California employees.",
};

const groups: TeamMember["group"][] = ["Leadership", "Attorneys", "Case team"];

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
}

export default function TeamPage() {
  return (
    <>
      <PageHero
        title="The people on your case."
        lede="Attorneys, paralegals, intake specialists, and case managers working together, so your case keeps moving and your calls get answered."
        crumbs={[{ label: "About", href: "/about" }, { label: "Our team" }]}
      />
      <section className="bg-paper">
        <div className="container-page space-y-20 py-16 md:py-24">
          {groups.map((g) => (
            <div key={g}>
              <h2 className="font-wide text-2xl font-extrabold tracking-tight">{g}</h2>
              <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
                {team
                  .filter((m) => m.group === g)
                  .map((m) => (
                    <li key={m.name}>
                      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-ink-2">
                        {m.photo ? (
                          <Image
                            src={m.photo}
                            alt={m.name}
                            fill
                            sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 46vw"
                            className="object-cover object-top"
                          />
                        ) : (
                          <span
                            aria-hidden
                            className="absolute inset-0 grid place-items-center font-wide text-5xl font-extrabold text-dusk/50"
                          >
                            {initials(m.name)}
                          </span>
                        )}
                      </div>
                      <p className="mt-4 font-semibold">{m.name}</p>
                      <p className="text-sm text-slate">{m.role}</p>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
          <div className="rounded-[1.5rem] bg-white p-8 ring-1 ring-line md:flex md:items-center md:justify-between">
            <p className="font-wide text-xl font-bold">We&rsquo;re hiring attorneys and paralegals.</p>
            <ArrowLink href="/careers" className="mt-4 md:mt-0">
              See open roles
            </ArrowLink>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
