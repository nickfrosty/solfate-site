/* eslint-disable @next/next/no-img-element */
import Layout from "~/layouts/default";
import Link from "next/link";

// construct the meta data for the page
const metaData = {
  title: "NFT Royalty Checker",
  description:
    "Check which of your NFT you paid royalties on, and pay the creators afterwards.",
};

export default function Page() {
  return (
    <Layout seo={metaData} className="container md:space-y-16">
      <div className="col-span-2 py-14 mx-auto space-y-8 text-center">
        <h1 className="text-5xl heading">NFT Royalty Checker</h1>

        <p className="mx-auto text-xl text-gray-500">
          Check which of your NFT you paid royalties on, and pay the creators
          afterwards.
        </p>

        <button className="btn" onClick={() => alert("coming soon")}>
          Soon, tm
        </button>
      </div>
    </Layout>
  );
}
