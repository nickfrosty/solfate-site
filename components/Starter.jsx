import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/solid";

// import styles from "~/styles/footer.module.css";
// import { NICK, TWITTER } from "~/constants";

export default function Starter() {
  return (
    <section className="py-8 bg-white">
      <section className="container grid gap-14 md:gap-8 lg:gap-5 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3 md:col-span-2 md:mb-14 md:px-24 lg:px-0 lg:mb-0">
          <h3 className="text-2xl font-bold">Ready to start learning?</h3>
          <p className="text-lg text-gray-500">
            Start your journey to learn Solana development with the Introduction
            to Solana course. It covers the basics of the Solana runtime and
            creating your first dApp.
          </p>
          <Link href="/courses">
            <a className="block w-min btn-flex">
              <span>Explore the Courses</span>
              <ArrowRightIcon className="icon-sm" />
            </a>
          </Link>
        </div>

        <div className="space-y-4 md:col-span-1">
          <h4 className="pl-4 text-2xl font-bold border-l-4 border-indigo-500">
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
          <h4 className="pl-4 text-2xl font-bold border-l-4 border-indigo-500">
            Get Setup
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
  );
}
