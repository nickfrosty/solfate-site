/* eslint-disable @next/next/no-img-element */
import Layout from "~/layouts/default";
import Link from "next/link";
import { basicMeta } from "~/utils/seoMetaData";
import { ArrowRightIcon } from "@heroicons/react/solid";

import UtilityListingCards from "~/components/UtilityListingCards";

// construct the meta data for the page
// const metaData = basicMeta({
const metaData = {
  title: "Page Not Found",
  description: "This page was not found. Keep on looking I guess.",
};

export default function Page() {
  return (
    <Layout seo={metaData} className="">
      {/* Page heading */}
      <div className="container col-span-2 my-16 space-y-8 max-w-2xl text-center">
        <h1 className="space-y-3 text-5xl font-bold">
          <span className="block">Page Not Found</span>
        </h1>

        <p className="mx-auto text-xl text-gray-500">I guess you hit a wall</p>

        <div className="flex justify-center">
          <Link href="/">
            <a className="block w-min btn-flex btn-indigo">
              <span>No place like home</span>
              <ArrowRightIcon className="icon-sm" />
            </a>
          </Link>
        </div>
      </div>

      {/* <AboutBlocks /> */}

      <UtilityListingCards />
    </Layout>
  );
}
