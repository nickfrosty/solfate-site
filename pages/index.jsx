/* eslint-disable @next/next/no-img-element */
import Layout from "~/layouts/default";
import Link from "next/link";
import { basicMeta } from "~/utils/seoMetaData";
import { ArrowRightIcon, BeakerIcon } from "@heroicons/react/24/solid";

import UtilityListingCards from "~/components/UtilityListingCards";
import AboutBlocks from "~/components/AboutBlocks";

// construct the meta data for the page
// const metaData = basicMeta({
const metaData = {
  title: "Building on Solana",
  description:
    "Crafting developer tooling and information resources for the Solana ecosystem.",
};

export default function Page() {
  return (
    <Layout seo={metaData} className="">
      {/* Page heading */}
      <div className="container col-span-2 my-16 space-y-8 max-w-2xl text-center">
        <h1 className="space-y-3 text-5xl font-bold">
          {/* Refining glass with <br />
					Solana Solfate */}
          <span className="block">Crafting on Solana</span>
          <span className="block">
            with <span className="shadow-orange-lg">Solfate</span>
          </span>
        </h1>

        <p className="mx-auto text-xl text-gray-500">
          {/* Refining glass into the future with Solana Solfate */}a public
          experiment of building into the Solana ecosystem
        </p>

        <div className="justify-center mx-auto space-y-3 w-full md:space-y-0 md:space-x-6 md:flex">
          <Link href="#utility">
            <a className="w-min btn-flex">
              <BeakerIcon className="icon-sm" />
              <span>Explore Utilities</span>
            </a>
          </Link>

          <Link href="/podcast">
            <a className="w-min btn-flex btn-indigo">
              <span>Listen to the Podcast</span>
              <ArrowRightIcon className="icon-sm" />
            </a>
          </Link>
        </div>
      </div>

      <AboutBlocks />

      <UtilityListingCards />
    </Layout>
  );
}
