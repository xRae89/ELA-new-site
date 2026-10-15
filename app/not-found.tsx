import { ArrowLink, CallButton } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="bg-paper">
      <div className="container-page max-w-3xl py-24 md:py-36">
        <p className="font-wide text-lg font-bold text-accent-ink">Page not found</p>
        <h1 className="display mt-4 text-[clamp(2.4rem,6vw,4.5rem)]">That page moved or never existed.</h1>
        <p className="mt-6 text-xl text-slate">
          Our site was recently rebuilt. Try the practice areas, or call us and we&rsquo;ll point you the right way.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <CallButton variant="ink" />
          <ArrowLink href="/practice-areas">Practice areas</ArrowLink>
          <ArrowLink href="/">Home</ArrowLink>
        </div>
      </div>
    </section>
  );
}
