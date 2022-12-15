/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/solid";
import styles from "~/styles/card.module.css";

export default function UtilityListingCards() {
  return (
    <section className="py-8 text-white bg-indigo-500">
      <section className="container grid gap-12 md:grid-cols-3">
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
          icon={"/icons/coin.svg"}
          title={"Fee Redeemer"}
          href={"/fees"}
          ctaText={"Get free money"}
        >
          Reclaim your wallet&apos;s rent and storage fees directly from the
          blockchain.
        </CardBox>
      </section>
    </section>
  );
}

function CardBox({
  title,
  children,
  ctaText = null,
  href = null,
  icon = null,
  iconAlt = null,
}) {
  return (
    <div
      className={`${styles.card} ${styles.shadow} bg-white text-black p-7 space-y-4`}
    >
      {icon && (
        <img
          src={icon}
          alt={iconAlt || title}
          className="absolute -mt-14 -ml-3 icon-xl"
        />
      )}

      <div className="space-y-5">
        <h4 className="text-3xl">{title}</h4>
        <p className="my-5">{children}</p>

        <Link href={href}>
          <a className="place-content-end space-x-2 link flexer">
            <span>{ctaText || "Explore"}</span>
            <ArrowRightIcon className="icon-sm" />
          </a>
        </Link>
      </div>
    </div>
  );
}
