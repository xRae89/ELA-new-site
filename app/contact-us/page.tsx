import type { Metadata } from "next";
import { Mail, MapPin, Phone, Sparkles } from "lucide-react";
import { OpenChatButton } from "@/components/chat/open-chat-button";
import { IntakeForm } from "@/components/intake-form";
import { Breadcrumbs, Office, Promises } from "@/components/sections";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Call (424) 234-5229, 24/7, or send your case for a free, confidential review. Employment Law Assist, 21731 Ventura Blvd., Suite 205, Woodland Hills.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-ink text-paper">
        <div className="container-page grid gap-14 py-12 md:py-20 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <div>
            <div className="[&_a]:text-dusk [&_a:hover]:text-paper [&_span]:text-dusk [&_[aria-current]]:text-paper">
              <Breadcrumbs items={[{ label: "Contact" }]} />
            </div>
            <h1 className="display mt-6 text-[clamp(2.4rem,6vw,5rem)]">Let&rsquo;s talk about what happened.</h1>
            <p className="mt-6 max-w-xl text-lg text-dusk">
              The consultation is free and confidential, and you pay nothing unless we win. Pick whichever way is
              easiest for you.
            </p>

            <ul className="mt-10 grid gap-3">
              <ContactRow icon={<Phone className="size-5" />} label="Call, 24/7" href={site.phone.href}>
                {site.phone.display}
              </ContactRow>
              <ContactRow icon={<Mail className="size-5" />} label="Email" href={`mailto:${site.email}`}>
                {site.email}
              </ContactRow>
              <ContactRow icon={<MapPin className="size-5" />} label="Office" href={site.address.mapsUrl}>
                {site.address.oneLine}
              </ContactRow>
              <li className="flex items-center gap-4 rounded-2xl bg-ink-2 p-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-signal text-ink">
                  <Sparkles className="size-5" />
                </span>
                <span>
                  <span className="block text-sm text-mist">Chat, instant answers</span>
                  <OpenChatButton icon={false} className="text-paper no-underline hover:underline">
                    Ask our AI assistant
                  </OpenChatButton>
                </span>
              </li>
            </ul>
            <div className="mt-10 max-w-lg">
              <Promises tone="dark" />
            </div>
          </div>
          <IntakeForm title="Free case review" />
        </div>
      </section>
      <Office title="Visit the office." />
    </>
  );
}

function ContactRow({
  icon,
  label,
  href,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <a href={href} className="flex items-center gap-4 rounded-2xl bg-ink-2 p-5 transition-colors hover:bg-ink-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-paper/10">{icon}</span>
        <span className="min-w-0">
          <span className="block text-sm text-mist">{label}</span>
          <span className="block break-words font-semibold">{children}</span>
        </span>
      </a>
    </li>
  );
}
