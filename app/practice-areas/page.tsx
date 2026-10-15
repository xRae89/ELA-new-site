import type { Metadata } from "next";
import { CtaBand, PageHero, PracticeList, ServiceAreas } from "@/components/sections";
import { ReviewButton } from "@/components/ui";

export const metadata: Metadata = {
  title: "Practice Areas",
  description:
    "Wrongful termination, meal and rest breaks, retaliation, discrimination, and harassment. California employment lawyers for employees. No fee unless we win.",
};

export default function PracticeAreasPage() {
  return (
    <>
      <PageHero
        title="Practice areas"
        lede="We represent employees, never employers. If you were fired, harassed, discriminated against, denied breaks, or punished for speaking up, start here."
        crumbs={[{ label: "Practice areas" }]}
      >
        <div className="mt-8">
          <ReviewButton />
        </div>
      </PageHero>
      <section className="bg-paper">
        <div className="container-page py-16 md:py-24">
          <PracticeList />
        </div>
      </section>
      <div id="service-areas">
        <ServiceAreas />
      </div>
      <CtaBand />
    </>
  );
}
