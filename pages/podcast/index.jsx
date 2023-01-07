/* eslint-disable @next/next/no-img-element */
import Layout from "~/layouts/default";
import Link from "next/link";
import { useState } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { INITIAL_EPISODES_PER_PAGE } from "~/lib/podcast";

import { getDocsByPath, filterDocs } from "zumo";
import PodcastHosts from "~/components/podcast/PodcastHosts";
import PodcastEpisodeCard from "~/components/podcast/PodcastEpisodeCard";
import RssLinks from "~/components/podcast/RssLinks";

// construct the meta data for the page
const metaData = {
  title: "Podcast",
  description: "Audio commentary from two developers building on Solana.",
};

export async function getStaticProps() {
  let episodes = await getDocsByPath("podcast/episodes");

  // extract the `featured` posts
  const featured = filterDocs(episodes, { featured: true }, 2);

  // remove the `featured` from the `episodes`
  if (Array.isArray(featured))
    episodes = episodes?.filter(
      (item) =>
        item.slug !==
        featured.filter((ft) => ft.slug === item?.slug)?.[0]?.meta.slug,
    );

  // give the 404 page when the post is not found
  // if (!episodes || !episodes?.length) return { notFound: true };

  return {
    props: { episodes, featured },
  };
}

export default function Page({ episodes, featured }) {
  const [counter, setCounter] = useState(INITIAL_EPISODES_PER_PAGE);

  return (
    <Layout seo={metaData} className="container space-y-16 md:space-y-24">
      <section className="col-span-2 mx-auto space-y-8 max-w-2xl text-center">
        <h1 className="text-5xl">
          Solfate <span className="shadow-orange-lg">Podcast</span>
        </h1>

        <p className="mx-auto text-xl text-gray-500">
          Audio commentary from two developers building on{" "}
          <a
            href="https://solana.com"
            className="link"
            target="_blank"
            rel="noreferrer"
          >
            Solana
          </a>
          .
        </p>

        <div className="flex justify-center items-center space-x-5">
          <RssLinks />

          <Link href={`/podcast/0`}>
            <a className="block w-min btn-flex btn-indigo">
              <span>Listen Now</span>
              <ArrowRightIcon className="icon-sm" />
            </a>
          </Link>
        </div>
      </section>

      <PodcastHosts />

      <section className="mx-auto space-y-6 max-w-3xl">
        {episodes?.length > 0 &&
          episodes
            .slice(0, counter)
            .map((ep, index) => (
              <PodcastEpisodeCard key={index} meta={ep?.meta || {}} />
            ))}

        {episodes.length > counter && (
          <div className="justify-center flexer">
            <button
              className="btn btn-indigo"
              onClick={() => setCounter((curr) => curr + 5)}
            >
              Load More Episodes
            </button>
          </div>
        )}
      </section>
    </Layout>
  );
}
