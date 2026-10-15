import type { Metadata } from "next";
import { Accordion, CtaBand, PageHero } from "@/components/sections";
import { OpenChatButton } from "@/components/chat/open-chat-button";
import { CallButton } from "@/components/ui";
import { faqGroups } from "@/lib/faq";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about California employment law: at-will firing, overtime, breaks, final pay, discrimination, harassment, retaliation, and our fees.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqGroups.flatMap((g) =>
    g.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  ),
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        title="Frequently asked questions"
        lede="General answers about California employment law and how we work. For your specific situation, a free consultation is the fastest way to a real answer."
        crumbs={[{ label: "FAQ" }]}
      >
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <CallButton variant="ink" />
          <OpenChatButton>Ask our AI assistant</OpenChatButton>
        </div>
      </PageHero>
      <section className="bg-paper">
        <div className="container-page grid gap-12 py-16 md:py-24 lg:grid-cols-[16rem_1fr] lg:gap-20">
          <nav aria-label="FAQ topics" className="lg:sticky lg:top-36 lg:self-start">
            <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
              {faqGroups.map((g) => (
                <li key={g.id}>
                  <a
                    href={`#${g.id}`}
                    className="block rounded-full border border-line px-4 py-2 text-sm font-semibold hover:border-ink lg:rounded-xl lg:border-0 lg:px-3 lg:text-base lg:hover:bg-paper-2"
                  >
                    {g.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-20">
            {faqGroups.map((g) => (
              <section key={g.id} id={g.id}>
                <h2 className="font-wide text-[clamp(1.6rem,2.6vw,2.15rem)] font-extrabold tracking-tight">{g.title}</h2>
                <Accordion items={g.items} className="mt-6" />
              </section>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
