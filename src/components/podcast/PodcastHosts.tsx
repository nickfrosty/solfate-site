/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

import { PODCAST_HOSTS } from "@/lib/podcast";

// import { ArrowRightIcon } from "@heroicons/react/24/outline";
// import { GITHUB } from "@/lib/constants";

export default function PodcastHosts({}) {
  return (
    <section className="py-8 bg-white">
      <section className="container grid gap-14 md:grid-cols-2">
        {/* <div className="space-y-4 md:col-span-2 md:mb-14 md:px-24 lg:px-0 lg:mb-0">
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
        </div> */}

        {PODCAST_HOSTS.map((person, index) => (
          <section key={index} className="space-y-4">
            <div className="space-x-8 flexer">
              <div className="avatar avatar-base">
                <img src={person.img} className="" alt={person.name} />
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl">
                  {/* <h2 className="pl-4 text-3xl border-l-4 border-indigo-500"> */}
                  {person.name}
                </h2>

                <SocialLinks person={person} iconSize="icon-md" />
              </div>
            </div>

            <p className="text-gray-500">{person?.bio}</p>

            {/* <Link href="/podcast">
              <a className="text-lg tracking-wide link flexer">
                <span className="">Explore Episodes</span>
                <ArrowRightIcon className="icon-sm" />
              </a>
            </Link> */}
          </section>
        ))}
      </section>
    </section>
  );
}

type SocialLinksProps = SimpleComponentProps & {
  person: any;
  iconSize?: string;
};

export function SocialLinks({
  person,
  className = "",
  iconSize = "icon-sm",
}: SocialLinksProps) {
  return (
    <div className={`space-x-2 ${className}`}>
      {person?.twitter && (
        <a
          href={`https://twitter.com/${person.twitter}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex"
          title={`@${person.twitter} on Twitter`}
        >
          <img
            src="/icons/twitter.svg"
            className={iconSize}
            alt={`@${person.twitter} on Twitter`}
          />
        </a>
      )}

      {person?.github && (
        <a
          href={`https://github.com/${person.github}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex"
          title={`${person.github} on Github`}
        >
          <img
            src="/icons/github.svg"
            className={iconSize}
            alt={`${person.github} on Github`}
          />
        </a>
      )}

      {person?.website && (
        <a
          href={person.website}
          target="_blank"
          rel="noreferrer"
          className="inline-flex"
          title={person.website}
        >
          <img
            src="/icons/link.svg"
            className={iconSize}
            alt={person.website}
          />
        </a>
      )}
    </div>
  );
}
