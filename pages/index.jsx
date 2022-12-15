/* eslint-disable @next/next/no-img-element */
import Layout from "~/layouts/default";
import Link from "next/link";
import { basicMeta } from "~/utils/seoMetaData";
import { ArrowRightIcon } from "@heroicons/react/solid";
import { LargeCard } from "~/components/cards/LargeCard";

import UtilityListingCards from "~/components/UtilityListingCards";
import AboutBlocks from "~/components/AboutBlocks";

// import Image from "next/image";
// import WaitlistForm from "~/components/waitlist/WaitlistForm";

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

        <div className="flex justify-center">
          <Link href="#utility">
            <a className="block w-min btn-flex btn-indigo">
              <span>Explore Utilities</span>
              <ArrowRightIcon className="icon-sm" />
            </a>
          </Link>
        </div>
      </div>

      <AboutBlocks />

      <UtilityListingCards />

      {/*  */}
      {/* <section className="grid-5">
        {[
          {
            id: 1,
            className: "col-span-2",
            title: "Solana Faucet",
            href: "/faucet",
            description:
              "Turn on the Solana faucet to get an airdrop of free SOL deposited to your testnet or devnet wallet instantly.",
            actionButton: "Open the Faucet",
          },
          // {
          // 	id: 1,
          // 	className: "col-span-2",
          // 	title: "Solfate Browser Extension",
          // 	href: "/extension",
          // 	description:
          // 		"Explore the decentralized Solana web though the power of .sol domains and IPFS.",
          // 	actionButton: "Get the extension",
          // },
          {
            id: 2,
            // className: "col-span-3",
            title: "Command Line Interface (CLI)",
            href: "/cli",
            image: "/img/cli/hot-reload.png",
            image_focus: "left",
            description:
              "Install the Solfate CLI to help build Solana programs faster and better.",
            actionButton: "Install the CLI",
          },
          // {
          // 	id: 3,
          // 	title: "Setup your dev environment",
          // 	// href: "/",
          // 	description:
          // 		"Get started in your Solana development journey by installing the Solana CLI, configuring VS code, and running a local validator.",
          // 	actionButton: "Get setup",
          // },
        ].map((item) => {
          return <LargeCard key={item.id} {...item} />;
        })}
      </section> */}
    </Layout>
  );
}
