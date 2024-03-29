/* eslint-disable @next/next/no-img-element */
import type { NextSeoProps } from "next-seo";
import Layout from "@/layouts/default";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRightIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/solid";

// construct the meta data for the page
const metaData: NextSeoProps = {
  title: "Solfate CLI",
  description:
    "Command line developer utility for building Solana programs: hot reloads, auto deploys, auto airdrops, and more!",
};

export default function Page() {
  // state used for the copy to clipboard section
  const [enabled, setEnabled] = useState(true);
  const [displayText, setDisplayText] = useState("npm i -g solfate");

  const copyToClipboard = (text: string) => {
    if (enabled) {
      navigator.clipboard.writeText(displayText);
      let tmp = displayText;
      setDisplayText("Copied!");
      setEnabled(false);
      setTimeout(() => {
        setDisplayText(tmp);
        setEnabled(true);
      }, 700);
    }
  };

  return (
    <Layout seo={metaData} className="container md:space-y-16">
      {/* Page heading */}
      <div className="max-w-2xl col-span-2 mx-auto space-y-8 text-center py-14">
        <h1 className="text-5xl heading">Solfate CLI</h1>

        <p className="mx-auto text-xl text-gray-500">
          Developer utility for building Solana programs
        </p>

        <div
          className="max-w-xs mx-auto cursor-pointer input"
          onClick={() => copyToClipboard}
        >
          <p className="justify-between space-x-5 text-base flexer">
            <span className="flex-grow block mx-auto font-mono">
              {displayText}
            </span>
            <DocumentDuplicateIcon className="flex-shrink icon-sm" />
          </p>
        </div>

        <div className="grid gap-4 text-center md:grid-cols-2">
          <Link
            href="https://github.com/nickfrosty/solfate-cli"
            target="_blank"
            rel="noreferrer"
            className="block mx-auto w-min btn-flex"
          >
            <span>View on Github</span>
            {/* <ArrowRightIcon className="icon-sm" /> */}
          </Link>
          <Link
            href="https://github.com/nickfrosty/solfate-cli/blob/master/cli/README.md"
            className="block mx-auto w-min btn-flex btn-indigo"
          >
            <span>Read the Docs</span>
            <ArrowRightIcon className="icon-sm" />
          </Link>
        </div>
      </div>

      {/* <div className="flex-shrink-0 p-5 mx-auto bg-white card sm:max-h-72 md:max-h-80 md:w-1/2">
        <h2 className="text-3xl font-semibold">
          Hot reloading Solana programs
        </h2>
        <p className="mt-2 mb-6 text-gray-500">
          Auto rebuild and reload Solana programs while editing, with optional
          auto deploys.
        </p>

        <img
          src="/img/cli/hot-reload.png"
          className="relative left-0 object-cover w-full h-full card"
          alt={
            "Live hot reloads and auto builds of Solana programs, with optional auto deploys"
          }
        />
      </div> */}
    </Layout>
  );
}
