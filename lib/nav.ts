import { practiceAreas } from "./practice-areas";
import { locationHref, regions } from "./regions";

export const practiceNav = practiceAreas.map((p) => ({
  label: p.name,
  href: `/${p.slug}`,
  description: p.short,
}));

export const regionNav = regions.map((r) => ({
  name: r.name,
  links: [
    { label: "Wrongful termination", href: locationHref(r.id, "wrongful-termination") },
    { label: "Retaliation", href: locationHref(r.id, "retaliation") },
    { label: "Discrimination", href: locationHref(r.id, "discrimination") },
  ],
}));

export const aboutNav = [
  { label: "About the firm", href: "/about", description: "Who we are and how we work." },
  { label: "Our team", href: "/our-team", description: "The attorneys and staff on your case." },
  { label: "Client reviews", href: "/reviews", description: "What clients say after their case." },
  { label: "Careers", href: "/careers", description: "Join a fast-growing plaintiff firm." },
];

export const footerNav = [
  { label: "About", href: "/about" },
  { label: "Our team", href: "/our-team" },
  { label: "Practice areas", href: "/practice-areas" },
  { label: "FAQ", href: "/faq" },
  { label: "Reviews", href: "/reviews" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact-us" },
];
