import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { ArrowLink, CallButton } from "@/components/ui";

export const metadata: Metadata = { title: "Thank You", robots: { index: false } };

export default function ThankYouPage() {
  return (
    <section className="bg-paper">
      <div className="container-page max-w-3xl py-24 md:py-36">
        <CheckCircle2 aria-hidden className="size-14 text-palm" strokeWidth={1.75} />
        <h1 className="display mt-8 text-[clamp(2.4rem,6vw,4.5rem)]">We have your case review.</h1>
        <p className="mt-6 text-xl text-slate">
          An intake specialist will reach out soon, usually the same day. If it&rsquo;s urgent, or you&rsquo;d rather
          not wait, call us now. We pick up 24/7.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <CallButton variant="signal" />
          <ArrowLink href="/faq">Read common questions while you wait</ArrowLink>
        </div>
      </div>
    </section>
  );
}
