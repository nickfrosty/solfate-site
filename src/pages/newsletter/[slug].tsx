import type { NextSeoProps } from "next-seo";
import { NewsPost, allNewsPosts } from "contentlayer/generated";
import Layout from "@/layouts/default";
import Link from "next/link";
import { SITE } from "@/lib/constants";

import { ProseContent } from "@/components/content/ProseContent";
import TagListing from "@/components/content/TagListing";
import { NextPrevEpisode } from "@/components/podcast/NextPrevEpisode";
import clsx from "clsx";

// get the listing of all of the markdown files
export async function getStaticPaths() {
  return {
    paths: allNewsPosts.map((item) => {
      return {
        params: {
          slug: item.slug,
        },
      };
    }),
    fallback: true,
  };
}

export async function getStaticProps({
  params: { slug },
}: {
  params: { slug: string };
}) {
  // define placeholders values
  let [post, next, prev]: Array<NewsPost | null> = [null, null, null];

  // get the current post being viewed
  const posts = allNewsPosts.sort(
    (a, b) => parseFloat(b.slug) - parseFloat(a.slug),
  );

  // loop and locate all the desired posts (current, next, and prev)
  for (let i = 0; i < posts.length; i++) {
    // ignore all except the current `slug`
    if (posts[i].slug != slug) continue;

    post = posts[i];

    // do not allow prev post to have slug lower than 1
    if (i > 0) next = posts[i - 1];

    // do not exceed the number of posts
    if (i < posts.length - 1) prev = posts[i + 1];
  }

  // 404 when the post is not found
  if (!post) return { notFound: true };
  // 404 for `draft` pages (in all non dev envs)
  else if (
    post?.draft === true &&
    process &&
    process.env?.NODE_ENV !== "development"
  )
    return { notFound: true };

  // define the seo settings to display
  const seo: NextSeoProps = {
    canonical: `${SITE.url}/newsletter/${post.slug}`,
    title: `Solana news: ${post.title}`,
    description: post.description,
    openGraph: {
      type: "website",
      url: `${SITE.url}/newsletter`,
      // site_name: "Solfate",
      title: `Solana news: ${post.title}`,
      images: [
        {
          url: `${SITE.url}${post.image}`,
          width: 1600,
          height: 900,
          alt: `Solana news: ${post.title}, by Solfate`,
        },
      ],
    },
    twitter: { cardType: "summary_large_image" },
  };

  return {
    props: { seo, post, next, prev },
  };
}

type PageProps = {
  seo: NextSeoProps;
  post: NewsPost;
  next?: NewsPost;
  prev?: NewsPost;
};

export default function Page({ seo, post, next, prev }: PageProps) {
  // note: some bug causes no `post` to be provided on `generate`.
  // this prevents the build error
  if (!post) return <>error</>;

  return (
    <Layout seo={{ ...post, ...seo }} className={``}>
      <section className="space-y-8 text-center container-prose">
        <section className="space-y-3">
          <h1 className="group">
            <Link
              href={post.href}
              className="text-3xl !leading-tight md:text-5xl lg:text-6xl "
            >
              <span className="shadow-orange-md md:shadow-orange-lg">
                Solana News
              </span>
              <br />
              <span className="group-hover:underline !font-normal text-2xl md:text-5xl">
                {post.title}
              </span>
            </Link>
          </h1>

          <p className="text-base italic text-gray-500">
            published on {new Date(post.date).toLocaleDateString()}
          </p>

          {/* <EpisodeMeta episode={episode} /> */}
        </section>

        {!!post?.tags && (
          <TagListing
            tags={post.tags}
            maxTagCount={5}
            className="justify-center"
          />
        )}

        <p className="text-xl md:text-2xl">{post.description}</p>
      </section>

      <article id="newsletter" className="relative pt-0 container-prose">
        <section className="relative md:-mx-[50vw] mb-5">
          {post?.image && (
            <img
              src={post.image}
              className={clsx(
                "max-w-4xl text-center mx-auto",
                "rounded-xl border border-gray-300 shadow-lg",
                `object-cover object-center`,
                `w-full h-full`,
              )}
              alt={post.title || "Solana News"}
            />
          )}
        </section>

        {/* <h2 className="text-3xl">Show Notes</h2> */}
        <ProseContent content={post.body?.raw || ""} />
      </article>

      {/* <section className="">
        <div className="container-prose">
          <NextPrevEpisode next={next} prev={prev} hrefBase={"/podcast"} />
        </div>
      </section> */}
    </Layout>
  );
}
