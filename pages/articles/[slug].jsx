/* eslint-disable @next/next/no-img-element */

import {
  generateStaticPaths,
  getDocBySlug,
  getDocMetaBySlug,
} from "../../toad/core/index";

import Link from "next/link";
import ArticleLayout from "~/layouts/ArticleLayout";

// import { basicMeta } from "~/utils/seoMetaData";
import { AuthorCard } from "~/components/content/AuthorCard";
// import { RelatedArticles } from "~/components/content/RelatedArticles";

import { ArticleMeta } from "~/components/content/ArticleMeta";
import { Breadcrumbs } from "~/components/content/Breadcrumbs";
import { ArticleContent } from "~/components/content/ArticleContent";
import { NextPrevSection } from "~/components/content/NextPrevSection";

// construct the meta data for the page
// const metaData = basicMeta({
const metaData = {
  title: "Articles",
  description: "",
};

// construct the parent link item for the breadcrumbs
const parentPage = {
  title: "Articles",
  href: "/articles",
};

export async function getStaticPaths() {
  // get the listing of all of the markdown files
  return generateStaticPaths("articles", false);
}

export async function getStaticProps({ params }) {
  if (process && process.env?.NODE_ENV !== "development")
    return { notFound: true };

  const post = await getDocBySlug(params?.slug, "articles");

  // give the 404 page when the post is not found
  if (!post) return { notFound: true };

  let next = null,
    prev = null;

  // parse out the `next` and `prev` articles, when defined by the post's `meta`
  if (post?.meta?.next_page)
    next = await getDocMetaBySlug(post.meta.next_page, "articles");
  if (post?.meta?.prev_page)
    prev = await getDocMetaBySlug(post.meta.prev_page, "articles");

  return {
    props: { post, next, prev },
  };
}

/*

*/
export default function SingleArticlePage({ post, next, prev }) {
  // const { post, next, prev } = props
  let { meta = {}, content = null, seo = {} } = post;

  // compute the link for the current page
  const href = `${parentPage?.href || ""}/${meta.slug}`;

  // TODO: support setting a canonical tag, likely via a util function to standardize the data
  // if (!meta?.canonical) meta.canonical = `${href}`;

  return (
    <ArticleLayout seo={{ ...meta, ...seo }} className="space-y-10">
      {/* Bread crumbs area */}
      <Breadcrumbs meta={meta} parent={parentPage} href={href} />

      {/* Primary content area */}
      <main className="space-y-5">
        <Link href={href}>
          <a>
            <h1 className="heading heading-xl hover:underline text-yellow-400">
              {meta?.title}
            </h1>
          </a>
        </Link>

        <ArticleMeta
          meta={meta}
          hrefTemplate={`${parentPage?.href}/browse/{{tag}}`}
        />

        <ArticleContent content={content} />
      </main>

      <NextPrevSection next={next} prev={prev} hrefBase={parentPage?.href} />

      {/* <AuthorCard /> */}

      {/* <RelatedArticles /> */}
    </ArticleLayout>
  );
}
