"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { aboutNav, practiceNav, regionNav } from "@/lib/nav";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ButtonLink, Logo } from "./ui";

function UtilityBar() {
  return (
    <div className="bg-ink text-[0.8125rem] text-dusk">
      <div className="container-page flex h-9 items-center justify-between gap-4">
        <p className="truncate">
          <span className="text-paper">No win, no fee.</span>{" "}
          <span className="hidden sm:inline">Free consultation, available 24/7 by phone.</span>
          <span className="sm:hidden">Free consultation.</span>
        </p>
        <div className="flex shrink-0 items-center gap-5">
          <span className="hidden sm:inline" lang="es">
            Hablamos español
          </span>
          <a href={site.phone.href} className="font-semibold text-paper hover:underline">
            {site.phone.display}
          </a>
        </div>
      </div>
    </div>
  );
}

function Dropdown({
  label,
  active,
  children,
  wide,
}: {
  label: string;
  active: boolean;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="group relative">
      <button
        type="button"
        aria-haspopup="true"
        className={cn(
          "flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.95rem] font-medium transition-colors hover:bg-ink/5",
          active && "text-accent-ink",
        )}
      >
        {label}
        <ChevronDown aria-hidden className="size-3.5 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
      </button>
      <div
        className={cn(
          "invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-[opacity,visibility] duration-150",
          "group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100",
        )}
      >
        <div
          className={cn(
            "rounded-2xl border border-line bg-white p-2 shadow-[0_24px_60px_-20px_rgba(14,42,35,0.35)]",
            wide ? "w-[min(52rem,90vw)]" : "w-80",
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function MenuItem({ href, label, description }: { href: string; label: string; description?: string }) {
  return (
    <Link href={href} className="block rounded-xl px-4 py-3 transition-colors hover:bg-paper">
      <span className="block font-semibold">{label}</span>
      {description && <span className="mt-0.5 block text-sm text-slate">{description}</span>}
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  // The menu remembers the path it was opened on, so navigating closes it.
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const open = openedOn === pathname;

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const inPractice = practiceNav.some((p) => p.href === pathname) || pathname === "/practice-areas";
  const inRegions = regionNav.some((r) => r.links.some((l) => l.href === pathname));
  const inAbout = aboutNav.some((a) => a.href === pathname);

  return (
    <header className="sticky top-0 z-40">
      <UtilityBar />
      <div className="border-b border-line/80 bg-paper/90 backdrop-blur-md">
        <div className="container-page flex h-[4.5rem] items-center justify-between gap-6">
          <Link href="/" className="shrink-0 text-ink" aria-label={`${site.name} home`}>
            <Logo className="h-9 w-auto sm:h-10" />
          </Link>

          <nav aria-label="Main" className="hidden items-center whitespace-nowrap xl:flex">
            <Dropdown label="Practice areas" active={inPractice}>
              {practiceNav.map((p) => (
                <MenuItem key={p.href} {...p} />
              ))}
              <div className="mt-1 border-t border-line px-4 pb-2 pt-3">
                <Link href="/practice-areas" className="text-sm font-semibold text-accent-ink hover:underline">
                  All practice areas
                </Link>
              </div>
            </Dropdown>
            <Dropdown label="Service areas" active={inRegions} wide>
              <div className="grid grid-cols-3 gap-1 p-2">
                {regionNav.map((r) => (
                  <div key={r.name} className="rounded-xl p-3">
                    <p className="font-wide text-sm font-bold">{r.name}</p>
                    <ul className="mt-2 space-y-1">
                      {r.links.map((l) => (
                        <li key={l.href}>
                          <Link href={l.href} className="text-[0.925rem] text-slate hover:text-ink hover:underline">
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Dropdown>
            <Dropdown label="About" active={inAbout}>
              {aboutNav.map((a) => (
                <MenuItem key={a.href} {...a} />
              ))}
            </Dropdown>
            <NavLink href="/faq" active={pathname === "/faq"}>
              FAQ
            </NavLink>
            <NavLink href="/blog" active={pathname.startsWith("/blog")}>
              Blog
            </NavLink>
            <NavLink href="/contact-us" active={pathname === "/contact-us"}>
              Contact
            </NavLink>
          </nav>

          <div className="flex items-center gap-2">
            <ButtonLink href="/contact-us#case-review" className="hidden px-5 py-3 md:inline-flex">
              Free case review
            </ButtonLink>
            <a
              href={site.phone.href}
              aria-label={`Call ${site.phone.display}`}
              className="grid size-11 place-items-center rounded-full bg-signal text-ink md:hidden"
            >
              <Phone aria-hidden className="size-5" />
            </a>
            <button
              type="button"
              onClick={() => setOpenedOn(open ? null : pathname)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid size-11 place-items-center rounded-full border border-ink/15 xl:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {open && <MobileMenu />}
    </header>
  );
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-full px-3.5 py-2 text-[0.95rem] font-medium transition-colors hover:bg-ink/5",
        active && "text-accent-ink",
      )}
    >
      {children}
    </Link>
  );
}

function MobileGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="group border-b border-line">
      <summary className="flex cursor-pointer items-center justify-between py-4 font-wide text-xl font-bold">
        {title}
        <ChevronDown aria-hidden className="size-5 transition-transform group-open:rotate-180" />
      </summary>
      <div className="pb-4">{children}</div>
    </details>
  );
}

function MobileMenu() {
  return (
    <div
      id="mobile-menu"
      className="fixed inset-x-0 bottom-0 top-[6.75rem] z-40 overflow-y-auto bg-paper xl:hidden"
    >
      <nav aria-label="Mobile" className="container-page pb-28 pt-2">
        <MobileGroup title="Practice areas">
          <ul className="space-y-1">
            {practiceNav.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="block py-1.5 text-lg">
                  {p.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/practice-areas" className="block py-1.5 text-lg font-semibold text-accent-ink">
                All practice areas
              </Link>
            </li>
          </ul>
        </MobileGroup>
        <MobileGroup title="Service areas">
          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            {regionNav.map((r) => (
              <div key={r.name}>
                <p className="font-semibold">{r.name}</p>
                <ul className="mt-1 space-y-1">
                  {r.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-slate">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </MobileGroup>
        <MobileGroup title="About">
          <ul className="space-y-1">
            {aboutNav.map((a) => (
              <li key={a.href}>
                <Link href={a.href} className="block py-1.5 text-lg">
                  {a.label}
                </Link>
              </li>
            ))}
          </ul>
        </MobileGroup>
        {[
          ["FAQ", "/faq"],
          ["Blog", "/blog"],
          ["Contact", "/contact-us"],
        ].map(([label, href]) => (
          <Link key={href} href={href} className="block border-b border-line py-4 font-wide text-xl font-bold">
            {label}
          </Link>
        ))}
        <div className="mt-8 grid gap-3">
          <ButtonLink href="/contact-us#case-review">Start a free case review</ButtonLink>
          <ButtonLink href={site.phone.href} variant="outline">
            <Phone aria-hidden className="size-4" /> Call {site.phone.display}
          </ButtonLink>
        </div>
      </nav>
    </div>
  );
}
