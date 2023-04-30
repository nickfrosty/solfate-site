/* eslint-disable @next/next/no-img-element */
import type { NextSeoProps } from "next-seo";
import Layout from "@/layouts/default";
import Link from "next/link";
import { useState } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { INITIAL_EPISODES_PER_PAGE } from "@/lib/podcast";

// import PodcastHosts from "@/components/podcast/PodcastHosts";
import PodcastEpisodeCard from "@/components/podcast/PodcastEpisodeCard";
import RssLinks from "@/components/podcast/RssLinks";
import { Episode, allEpisodes } from "contentlayer/generated";

// construct the meta data for the page
const metaData: NextSeoProps = {
  title: "Browse Podcast Episodes",
  description:
    "Audio commentary from two developers building on Solana, Nick (@nickfrosty) and James (@jamesrp13).",
};

export async function getStaticProps() {
  // get the list of all episodes
  let episodes = allEpisodes
    .map((ep) => {
      ep.body = "" as any;
      return ep;
    })
    .sort((a, b) => parseFloat(b.slug) - parseFloat(a.slug));

  // extract the `featured` posts
  const featured = episodes.filter((item) => item.featured).slice(0, 2);

  // remove the `featured` from the `episodes`
  if (Array.isArray(featured) && featured.length > 0) {
    episodes = episodes?.filter(
      (item) =>
        item.slug !==
        featured.filter((ft) => ft.slug === item?.slug)?.[0]?.slug,
    );
  }

  return {
    props: { episodes, featured },
  };
}

type PageProps = {
  episodes: Array<Episode>;
  featured: Array<Episode>;
};

export default function Page({ episodes, featured }: PageProps) {
  const [counter, setCounter] = useState(INITIAL_EPISODES_PER_PAGE);

  return (
    <Layout seo={metaData} className="container space-y-16 md:space-y-24">
      <section className="max-w-2xl col-span-2 mx-auto space-y-8 text-center">
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

        <div className="flex items-center justify-center space-x-5">
          <RssLinks />

          <Link
            href={`/podcast/${episodes?.[0].slug || "0"}`}
            className="block w-min btn-flex btn-indigo"
          >
            <span>Latest Episode</span>
            <ArrowRightIcon className="icon-sm" />
          </Link>
        </div>
      </section>

      {/* <PodcastHosts /> */}

      <section className="max-w-3xl mx-auto space-y-6">
        {episodes?.length > 0 &&
          episodes
            .slice(0, counter)
            .map((episode, index) => (
              <PodcastEpisodeCard key={index} episode={episode} />
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
