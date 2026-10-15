export const site = {
  name: "Employment Law Assist",
  legalName: "Employment Law Assist, APC",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://employmentlawassist.com",
  description:
    "California employment lawyers for workers who were fired, harassed, discriminated against, retaliated against, or denied breaks. No fee unless we win. Free consultation, 24/7 by phone.",
  phone: {
    display: "(424) 234-5229",
    href: "tel:+14242345229",
    e164: "+14242345229",
  },
  email: "info@employmentlawassist.com",
  address: {
    street: "21731 Ventura Blvd., Suite 205",
    city: "Woodland Hills",
    region: "CA",
    postalCode: "91364",
    oneLine: "21731 Ventura Blvd., Suite 205, Woodland Hills, CA 91364",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=21731+Ventura+Blvd+Suite+205+Woodland+Hills+CA+91364",
    embedUrl:
      "https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s21731+Ventura+Blvd+Suite+205,+Woodland+Hills,+CA+91364!6i15",
  },
  /** Bump each January; Cache Components forbids `new Date()` in prerendered markup. */
  copyrightYear: 2026,
  promises: [
    "No win, no fee",
    "Free consultation",
    "Available 24/7 by phone",
    "Hablamos español",
  ],
} as const;

export type NavLink = { label: string; href: string; description?: string };
