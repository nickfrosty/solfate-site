/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import DefaultLayout from "~/layouts/default";
import { basicMeta } from "~/utils/seoMetaData";
import { LargeCard } from "~/components/cards/LargeCard";
import { SmallCard } from "~/components/cards/SmallCard";

// import Image from "next/image";
// import WaitlistForm from "~/components/waitlist/WaitlistForm";

// construct the meta data for the page
// const metaData = basicMeta({
const metaData = {
  title: "Articles",
  description: "",
};

export default function HomePage() {
  return (
    <DefaultLayout seo={metaData}>
      {/* <p>page content here</p> */}

      <section className="double-wide-cards">
        {[
          {
            id: 1,
            title: "Introduction to the Solana CLI",
            href: "/articles/intro-to-solana-cli",
            description:
              "Learn the basics and how to get around in the Solana CLI",
            image: "d",
          },
          {
            id: 2,
            title: "What is a NFT?",
            href: "/articles/nft",
            image: "d",
          },
        ].map((item) => {
          return <LargeCard key={item.id} {...item}></LargeCard>;
        })}
      </section>

      <section className="card-listing">
        {[
          {
            id: 1,
            title: "Setup Solana on Linux",
            description: "",
            href: "/articles/setup-solana-on-linux",
          },
        ].map((item) => {
          return (
            <SmallCard key={item.id} {...item}>
              Description of the article here. Learn these really cool things
              here. Should likely cap it around 155ish characters.
            </SmallCard>
          );
        })}
      </section>
    </DefaultLayout>
  );
}
