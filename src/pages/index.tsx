/* eslint-disable @next/next/no-img-element */
import type { NextSeoProps } from "next-seo";
import Layout from "@/layouts/default";
import Link from "next/link";
import { ArrowRightIcon, Bars3CenterLeftIcon } from "@heroicons/react/24/solid";
// @ts-ignore
import { getDocsByPath, filterDocs } from "zumo";

import PodcastHosts from "@/components/podcast/PodcastHosts";
import RssLinks from "@/components/podcast/RssLinks";
import PodcastEpisodesBlock from "@/components/podcast/PodcastEpisodesBlock";
import { Episode, allEpisodes } from "contentlayer/generated";

// construct the meta data for the page
const metaData: NextSeoProps = {
  title: "Interviews with blockchain founders on Solana",
  description:
    "Interviews with blockchain founders and audio commentary from two developers building on Solana, by Nick (@nickfrosty) and James (@jamesrp13).",
};

export async function getStaticProps() {
  // get the list of all episodes
  let episodes = allEpisodes
    .map((ep) => {
      ep.body = "" as any;
      return ep;
    })
    .sort((a, b) => parseFloat(b.slug) - parseFloat(a.slug));

  console.log("total:", episodes.length);

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
  return (
    <Layout seo={metaData} className="">
      <section className="container max-w-2xl col-span-2 mx-auto my-16 space-y-10 text-center">
        <h1 className="text-6xl">
          Solfate <span className="shadow-orange-lg">Podcast</span>
        </h1>

        <h2 className="mx-auto text-xl font-normal text-gray-500">
          Interviews with blockchain founders and builders on{" "}
          <a
            href="https://solana.com"
            className="link"
            target="_blank"
            rel="noreferrer"
          >
            Solana
          </a>
          .
          <br />
          Audio commentary from two developers in the Solana ecosystem.
        </h2>

        <div className="items-center justify-center block space-y-4 md:flex md:space-x-5 md:space-y-0">
          <Link href={`/podcast`} className="block w-min btn-flex btn">
            <Bars3CenterLeftIcon className="icon-sm" />
            <span>Browse Episodes</span>
          </Link>

          <Link
            href={`/podcast/${episodes?.[0].slug || "0"}`}
            className="block w-min btn-flex btn-indigo"
          >
            <span>Latest Episode</span>
            <ArrowRightIcon className="icon-sm" />
          </Link>
        </div>

        <div className="flex items-center justify-center space-x-5">
          <RssLinks />
        </div>
      </section>

      <PodcastHosts />

      <PodcastEpisodesBlock
        title="Recent Episodes"
        episodes={episodes?.slice(0, 2)}
      />
    </Layout>
  );
}
