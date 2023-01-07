/* eslint-disable @next/next/no-img-element */
import Layout from "~/layouts/default";
import Link from "next/link";
import { ArrowRightIcon, Bars3CenterLeftIcon } from "@heroicons/react/24/solid";
import { getDocsByPath, filterDocs } from "zumo";

import PodcastHosts from "~/components/podcast/PodcastHosts";
import RssLinks from "~/components/podcast/RssLinks";
import PodcastEpisodesBlock from "~/components/podcast/PodcastEpisodesBlock";

// construct the meta data for the page
const metaData = {
  title: "Building on Solana",
  description:
    "Audio commentary from two developers building on Solana, Nick (@nickfrosty) and James (@jamesrp13).",
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
  return (
    <Layout seo={metaData} className="">
      <section className="container col-span-2 mx-auto my-16 space-y-10 max-w-2xl text-center">
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
          <Link href={`/podcast`}>
            <a className="block w-min btn-flex btn">
              <Bars3CenterLeftIcon className="icon-sm" />
              <span>Browse Episodes</span>
            </a>
          </Link>

          <Link href={`/podcast/0`}>
            <a className="block w-min btn-flex btn-indigo">
              <span>Listen Now</span>
              <ArrowRightIcon className="icon-sm" />
            </a>
          </Link>
        </div>

        <div className="flex justify-center items-center space-x-5">
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
