/* eslint-disable @next/next/no-img-element */
import Layout from "~/layouts/default";
import { NextSeo } from "next-seo";
import { basicMeta } from "~/utils/seoMetaData";
import { ArrowRightIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { LargeCard } from "~/components/cards/LargeCard";

// import Image from "next/image";
// import WaitlistForm from "~/components/waitlist/WaitlistForm";

// construct the meta data for the page
// const metaData = basicMeta({
const metaData = {
  title: "Building on Solana",
  description:
    "Crafting developer tooling and information resources for the Solana ecosystem.",
};

export default function HomePage() {
  return (
    <Layout seo={metaData} className="space-y-16">
      {/* Page heading */}
      <div className="container col-span-2 space-y-8 max-w-2xl text-center">
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
          <Link href="/extension">
            <a className="block w-min btn btn-indigo">
              <span>Explore Solfate</span>
              <ArrowRightIcon className="icon-sm" />
            </a>
          </Link>
        </div>
      </div>

      {/*  */}
      <section className="bg-white">
        <section className="container grid gap-14 md:gap-8 lg:gap-5 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3 md:col-span-2 md:mb-14 md:px-24 lg:px-0 lg:mb-0">
            <h3 className="text-2xl font-bold">Ready to start learning?</h3>
            <p className="text-lg text-gray-500">
              Start your journey to learn Solana development with the
              Introduction to Solana course. It covers the basics of the Solana
              runtime and creating your first dApp.
            </p>
            <Link href="/courses">
              <a className="block w-min btn">
                <span>Explore the Courses</span>
                <ArrowRightIcon className="icon-sm" />
              </a>
            </Link>
          </div>

          <div className="space-y-4 md:col-span-1">
            <h4 className="pl-4 text-2xl font-bold border-l-4 border-indigo-600">
              Solana Fundamentals
            </h4>
            <p className="text-gray-500">
              Learn the fundamentals of the Solana blockchain, from how data is
              stored and accounts interact.
            </p>

            <a href="" className="text-lg tracking-wide link flexer">
              <span className="">Start learning</span>
              <ArrowRightIcon className="icon-sm" />
            </a>
          </div>

          <div className="space-y-4 md:col-span-1">
            <h4 className="pl-4 text-2xl font-bold border-l-4 border-indigo-600">
              Setup your Environment
            </h4>
            <p className="text-gray-500">
              Setup your local dev environment to start creating your first
              on-chain Solana program with Rust.
            </p>

            <a href="" className="text-lg tracking-wide link flexer">
              <span className="">Get setup</span>
              <ArrowRightIcon className="icon-sm" />
            </a>
          </div>
        </section>
      </section>

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
