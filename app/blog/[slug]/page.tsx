import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLayout, ArticleSections } from "@/components/article";
import { CtaBand, PageHero, RelatedLinks } from "@/components/sections";
import { getPracticeArea } from "@/lib/practice-areas";
import { getPost, posts } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

// Every param is prerendered by generateStaticParams; this only quiets the
// dev-time instant-navigation check for params read outside <Suspense>.
export const instant = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const p = getPost((await params).slug);
  return p ? { title: p.title, description: p.excerpt, alternates: { canonical: `/blog/${p.slug}` } } : {};
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const area = getPracticeArea(post.related);

  return (
    <>
      <PageHero title={post.title} lede={post.excerpt} crumbs={[{ label: "Blog", href: "/blog" }, { label: "Guide" }]}>
        <p className="mt-6 text-sm text-slate">
          Published <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>
      </PageHero>
      <ArticleLayout>
        <ArticleSections sections={post.sections} />
        <p className="mt-14 rounded-[1.25rem] bg-paper-2 p-6 text-sm text-slate">
          This guide is general information, not legal advice. Every case turns on its facts. Talk to an attorney about
          yours.
        </p>
        <div className="mt-14 grid gap-10 sm:grid-cols-2">
          {area && <RelatedLinks title="Related practice area" links={[{ label: area.name, href: `/${area.slug}` }]} />}
          <RelatedLinks
            title="More guides"
            links={posts.filter((p) => p.slug !== post.slug).map((p) => ({ label: p.title, href: `/blog/${p.slug}` }))}
          />
        </div>
      </ArticleLayout>
      <CtaBand />
    </>
  );
}
