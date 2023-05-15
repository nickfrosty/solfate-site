/* eslint-disable @next/next/no-img-element */
import type { NextSeoProps } from "next-seo";
import Layout from "@/layouts/default";
import Link from "next/link";
import { ArrowRightIcon, Bars3CenterLeftIcon } from "@heroicons/react/24/solid";

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
      ep.body.html = "" as any;
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
          From two developers in the Solana ecosystem.
        </h2>

        <div className="grid items-center justify-center gap-4 md:flex">
          <Link
            href={`/podcast`}
            className="justify-center block w-full md:w-min btn-flex btn btn-lg"
          >
            <Bars3CenterLeftIcon className="icon-base" />
            <span>Browse Episodes</span>
          </Link>

          <Link
            href={`/podcast/${episodes?.[0].slug || "0"}`}
            className="justify-center block w-full md:w-min btn-flex btn-indigo btn-lg"
          >
            <span>Latest Episode</span>
            <ArrowRightIcon className="icon-base" />
          </Link>
        </div>

        <RssLinks className="flex items-center justify-center gap-5" />
      </section>

      <PodcastHosts />

      <PodcastEpisodesBlock
        title="Recent Episodes"
        episodes={episodes?.slice(0, 2)}
      />
    </Layout>
  );
}
