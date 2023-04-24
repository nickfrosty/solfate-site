/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import styles from "@/styles/card.module.css";

export default function UtilityListingCards() {
  return (
    <section id="utility" className="py-8 text-white bg-indigo-500">
      <section className="my-8 space-y-3 text-center">
        <h2 className="text-5xl">Ecosystem Utilities</h2>
        {/* <p className=""></p> */}
      </section>

      <section className="container grid gap-8 gap-y-16 md:grid-cols-3">
        <CardBox
          icon={"/icons/crown.svg"}
          title={"Royalty Checker"}
          href={"/royalty"}
          ctaText={"Check Wallet"}
        >
          Check which of your NFT you paid royalties on, and pay the creators
          afterwards.
        </CardBox>

        <CardBox
          icon={"/icons/shower.svg"}
          title={"Solana Faucet"}
          href={"/faucet"}
          ctaText={"Airdrop SOL"}
        >
          Open the Solana faucet to get SOL deposited to your wallet instantly.
        </CardBox>

        <CardBox
          icon={"/icons/money-bag.svg"}
          title={"Fee Redeemer"}
          href={"/fees"}
          ctaText={"Get free money"}
        >
          Reclaim your wallet&apos;s rent and storage fees directly from the
          blockchain.
        </CardBox>

        {/* <CardBox
          icon={"/icons/snapshot.svg"}
          title={"Holder Snapshot"}
          href={"/snapshot"}
          ctaText={"Gather holders"}
        >
          Generate an up-to-date list of all the holders for an NFT collection.
        </CardBox>

        <CardBox
          icon={"/icons/coin.svg"}
          title={"Token Generator"}
          href={"/tokens"}
          ctaText={"Create a Token"}
        >
          Easy to use interface to create Solana SPL tokens, and airdrop it to
          anyone.
        </CardBox> */}
      </section>
    </section>
  );
}

type CardBoxProps = SimpleComponentProps & {
  title: string;
  ctaText?: string;
  href: string;
  icon?: string;
  iconAlt?: string;
};

function CardBox({
  title,
  children,
  ctaText,
  href,
  icon,
  iconAlt,
}: CardBoxProps) {
  return (
    <div
      className={`${styles.card} ${styles.shadow} bg-white text-black p-7 space-y-4`}
    >
      {icon && (
        <img
          src={icon}
          alt={iconAlt || title}
          className="absolute -ml-3 -mt-14 icon-xl"
        />
      )}

      <div className="space-y-5">
        <h4 className="text-3xl">{title}</h4>
        <p className="my-5">{children}</p>

        <Link href={href} className="space-x-2 place-content-end link flexer">
          <span>{ctaText || "Explore"}</span>
          <ArrowRightIcon className="icon-sm" />
        </Link>
      </div>
    </div>
  );
}
