/* eslint-disable @next/next/no-img-element */
import type { NextSeoProps } from "next-seo";
import Layout from "@/layouts/default";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { INITIAL_EPISODES_PER_PAGE } from "@/lib/podcast";

import { NewsPost, allNewsPosts } from "contentlayer/generated";
import { NewsCard } from "@/components/newsletter/NewsCard";
import { NewsCardGrid } from "@/components/newsletter/NewsCardGrid";
import { SITE } from "@/lib/constants";

// construct the meta data for the page
const metaData: NextSeoProps = {
  titleTemplate: `${SITE.name} Newsletter - %s`,
  canonical: `${SITE.url}/newsletter`,
  title: "Solana news from around the ecosystem",
  description:
    "Stay up-to-date with the Solana ecosystem.\
    Byte sized, short form, and skimmable in 2 minutes or less.",
  openGraph: {
    type: "website",
    url: `${SITE.url}/newsletter`,
    // site_name: "Solfate",
    title: "Solana news from around the ecosystem, by Solfate",
    images: [
      {
        url: `${SITE.url}/media/solana-newsletter-cover.jpg`,
        width: 1600,
        height: 900,
        alt: SITE.name,
      },
    ],
  },
  twitter: { cardType: "summary_large_image" },
};

export async function getStaticProps() {
  // get the list of all posts
  let posts = allNewsPosts
    .map((post) => {
      post.body.html = "" as any;
      return post;
    })
    .sort((a, b) => parseFloat(b.slug) - parseFloat(a.slug));

  // extract the `featured` posts
  // const featured = posts.filter((post) => post.featured).slice(0, 2);

  // use the most recent post as the `featured`
  const featured = posts.shift();

  // remove the `featured` from the `episodes`
  // if (Array.isArray(featured) && featured.length > 0) {
  //   posts = posts?.filter(
  //     (post) =>
  //       post.slug !==
  //       featured.filter((ft) => ft.slug === post?.slug)?.[0]?.slug,
  //   );
  // }

  return {
    props: { posts, featured },
  };
}

type PageProps = {
  posts: Array<NewsPost>;
  featured: NewsPost;
};

export default function Page({ posts, featured }: PageProps) {
  const [counter, setCounter] = useState(INITIAL_EPISODES_PER_PAGE);

  return (
    <Layout seo={metaData} className="container space-y-16 md:space-y-24">
      <section className="grid-cols-2 gap-12 space-y-10 md:space-y-0 md:grid md:mb-30">
        <section className="w-full space-y-4 place-content-start place-self-center">
          <h1 className="text-4xl !leading-tight md:text-5xl">
            <span className="shadow-orange-md md:shadow-orange-lg">
              Solana news,
            </span>
            <br />
            delivered weekly
          </h1>

          <p className="text-xl text-gray-500">
            Byte sized, short form, and skimmable
            <br />
            <span className="italic underline">in 2 minutes or less</span>.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center max-w-lg gap-4"
          >
            <input
              type="email"
              name=""
              id=""
              className="input"
              placeholder="Enter your best email..."
            />
            <button
              className="btn btn-indigo"
              onClick={() => setCounter((curr) => curr + 5)}
            >
              Keep up-to-date!
            </button>
          </form>

          {/* <p className="space-x-6 flexer">
            {count && (
              <span className="flexer-spacer">
                <DocumentTextIcon className="icon-md" />
                <span className="">
                  {parseInt(count).toLocaleString()} {countLabel}
                </span>
              </span>
            )}

            {metadata?.date && (
              <span className="flexer-spacer">
                <CalendarIcon className="icon-md" />
                <span className="">
                  {DateTime.fromISO(metadata.date).toRelativeCalendar()}
                </span>
              </span>
            )}
          </p> */}
        </section>

        {/* featured / image area */}
        {!!featured && (
          <section className="w-full place-content-start place-self-center">
            <NewsCard post={featured} />
          </section>
        )}
      </section>

      <NewsCardGrid posts={posts} />

      {/* <section className="max-w-3xl mx-auto space-y-6">
        {posts?.length > 0 &&
          posts
            .slice(0, counter)
            .map((post, index) => <NewsCard post={post} />)}

        {posts.length > counter && (
          <div className="justify-center flexer">
            <button
              className="btn btn-indigo"
              onClick={() => setCounter((curr) => curr + 5)}
            >
              Load more Solana news
            </button>
          </div>
        )}
      </section> */}
    </Layout>
  );
}
