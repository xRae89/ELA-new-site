import Image from "next/image";
import Link from "next/link";
import { footerNav, practiceNav, regionNav } from "@/lib/nav";
import { site } from "@/lib/site";
import { Logo } from "./ui";

const badges = [
  { src: "/images/badges/california-state-bar-badge.png", alt: "State Bar of California", w: 250, h: 250 },
  { src: "/images/badges/abalogo.png", alt: "American Bar Association", w: 600, h: 195 },
  { src: "/images/badges/caala.png", alt: "Consumer Attorneys Association of Los Angeles", w: 701, h: 208 },
  { src: "/images/badges/cela.webp", alt: "California Employment Lawyers Association", w: 600, h: 200 },
  { src: "/images/badges/avvo-badge.png", alt: "Avvo", w: 256, h: 228 },
];

export function Memberships() {
  return (
    <div className="border-t border-line bg-white">
      <div className="container-page flex flex-col items-center gap-6 py-10 md:flex-row md:justify-between">
        <p className="text-sm text-slate">Professional memberships and recognition</p>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {badges.map((b) => (
            <li key={b.src}>
              <Image
                src={b.src}
                alt={b.alt}
                width={b.w}
                height={b.h}
                className="h-11 w-auto object-contain opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-ink text-dusk">
      <Memberships />
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo className="h-11 w-auto text-paper" />
          <address className="mt-8 space-y-1 not-italic">
            <p>{site.address.street}</p>
            <p>
              {site.address.city}, {site.address.region} {site.address.postalCode}
            </p>
          </address>
          <p className="mt-5">
            <a href={site.phone.href} className="font-wide text-2xl font-bold text-paper hover:underline">
              {site.phone.display}
            </a>
          </p>
          <p className="mt-1">
            <a href={`mailto:${site.email}`} className="hover:text-paper hover:underline">
              {site.email}
            </a>
          </p>
        </div>

        <FooterColumn title="Practice areas">
          {practiceNav.map((p) => (
            <FooterLink key={p.href} href={p.href}>
              {p.label}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title="Service areas">
          {regionNav.map((r) => (
            <FooterLink key={r.name} href={r.links[0].href}>
              {r.name}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title="Firm">
          {footerNav.map((l) => (
            <FooterLink key={l.href} href={l.href}>
              {l.label}
            </FooterLink>
          ))}
        </FooterColumn>
      </div>

      <div className="border-t border-paper/10">
        <div className="container-page grid gap-6 py-8 text-[0.8125rem] leading-relaxed text-mist lg:grid-cols-[2fr_1fr]">
          <p className="max-w-3xl">
            Attorney advertising. This website offers general information, not legal advice about your situation.
            Reading it, chatting with our assistant, or contacting us does not create an attorney-client relationship.
            Prior results do not guarantee a similar outcome.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 lg:justify-end">
            <Link href="/privacy-policy" className="hover:text-paper">
              Privacy policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-paper">
              Terms and conditions
            </Link>
            <span>
              © {site.copyrightYear} {site.legalName}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-wide text-sm font-bold text-paper">{title}</p>
      <ul className="mt-5 space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="transition-colors hover:text-paper">
        {children}
      </Link>
    </li>
  );
}
