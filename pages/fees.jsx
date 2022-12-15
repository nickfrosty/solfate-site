/* eslint-disable @next/next/no-img-element */
import Layout from "~/layouts/default";
import Link from "next/link";

// construct the meta data for the page
const metaData = {
  title: "Solana Fee Redeemer",
  description:
    "Reclaim your wallet's rent and storage fees directly from the blockchain. It's basically free money...that was always yours.",
};

export default function Page() {
  return (
    <Layout seo={metaData} className="container md:space-y-16">
      <div className="col-span-2 py-14 mx-auto space-y-8 text-center">
        <h1 className="text-5xl heading">NFT Royalty Checker</h1>

        <p className="mx-auto max-w-3xl text-xl text-gray-500">
          Reclaim your wallet&apos;s rent and storage fees directly from the
          blockchain. <br />
          It's basically free money...that was always yours!
        </p>

        <button className="btn" onClick={() => alert("coming soon")}>
          Soon, tm
        </button>
      </div>
    </Layout>
  );
}
