import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/solid";
import { GITHUB } from "~/constants";

// import styles from "~/styles/footer.module.css";
// import { NICK, TWITTER } from "~/constants";

export default function AboutBlocks() {
  return (
    <section className="py-8 bg-white">
      <section className="container grid gap-14 md:gap-8 lg:gap-5 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4 md:col-span-2 md:mb-14 md:px-24 lg:px-0 lg:mb-0">
          <h3 className="text-2xl font-bold">
            Open source,
            <br className="md:hidden" /> with an open mind
          </h3>
          <p className="text-lg text-gray-500">
            Solfate is a public experiment of building into the Solana
            blockchain ecosystem. Solfate is primarily focused on building
            useful tools and utilities for the masses.
          </p>

          <Link href={GITHUB}>
            <a className="block w-min btn-flex">
              <span>View on GitHub</span>
              <ArrowRightIcon className="icon-sm" />
            </a>
          </Link>
        </div>

        <div className="space-y-4 md:col-span-1">
          <h4 className="pl-4 text-2xl font-bold border-l-4 border-indigo-500">
            Utilities
          </h4>
          <p className="text-gray-500">
            A collection of assorted "mini tools" that help creators and builder
            in the Solana ecosystem.
          </p>

          <Link href="/#utility">
            <a className="text-lg tracking-wide link flexer">
              <span className="">Explore Utilities</span>
              <ArrowRightIcon className="icon-sm" />
            </a>
          </Link>
        </div>

        <div className="space-y-4 md:col-span-1">
          <h4 className="pl-4 text-2xl font-bold border-l-4 border-indigo-500">
            Products
          </h4>
          <p className="text-gray-500">
            Standalone applications and/or services that on their own could be
            available to the masses.
          </p>

          <Link href="/#products">
            <a className="text-lg tracking-wide link flexer">
              <span className="">Explore Products</span>
              <ArrowRightIcon className="icon-sm" />
            </a>
          </Link>
        </div>
      </section>
    </section>
  );
}
