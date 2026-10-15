import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageHero } from "@/components/sections";
import { posts } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description: "Plain-language guides to California employment law from the attorneys at Employment Law Assist.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        title="Know your rights."
        lede="Plain-language guides to California employment law, written for the people it protects."
        crumbs={[{ label: "Blog" }]}
      />
      <section className="bg-paper">
        <div className="container-page py-16 md:py-24">
          <ul className="grid gap-4 md:grid-cols-3">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group flex h-full flex-col rounded-[1.5rem] bg-white p-7 ring-1 ring-line transition-colors hover:bg-ink hover:text-paper"
                >
                  <time dateTime={p.date} className="text-sm text-slate group-hover:text-mist">
                    {formatDate(p.date)}
                  </time>
                  <h2 className="mt-4 font-wide text-2xl font-extrabold leading-tight tracking-tight">{p.title}</h2>
                  <p className="mt-4 flex-1 text-slate group-hover:text-dusk">{p.excerpt}</p>
                  <span className="mt-6 font-semibold underline underline-offset-4">Read the guide</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
