/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import Link from "next/link";
import { PODCAST_HOSTS } from "@/lib/podcast";

import styles from "@/styles/card.module.css";
import { SocialLinks } from "@/components/podcast/PodcastHosts";
// import { StarIcon } from "@heroicons/react/24/solid";

type ComponentProps = SimpleComponentProps & { guests: any };

export function EpisodeHosts({ guests, className = "" }: ComponentProps) {
  // TODO: handle displaying `guests`

  return (
    <section id="hosts" className="grid w-full gap-4 md:gap-8 md:grid-cols-2">
      {PODCAST_HOSTS.map((person, index) => (
        <div key={index} className={clsx(styles["shadow-card"], "bg-white")}>
          <div className="flex p-4 space-x-4 md:space-x-6">
            <Link href={`https://twitter.com/${person.twitter}`}>
              <a
                target="_blank"
                rel="noreferrer"
                className="flex-shrink-0 avatar avatar-sm"
              >
                <img src={person.img} alt={person.name} />
              </a>
            </Link>

            <div className="flex-grow space-y-2">
              <div className="justify-between flexer">
                <Link href={`https://twitter.com/${person.twitter}`}>
                  <a target="_blank" rel="noreferrer">
                    <h3 className="block text-2xl line-clamp-1">
                      {person.name}
                    </h3>
                  </a>
                </Link>
                <SocialLinks person={person} className="text-gray-400" />
                {/* <StarIcon className="block text-yellow-400 icon-sm" /> */}
              </div>

              <p className="text-sm line-clamp-1">
                {person?.blurb || person?.bio || ""}
              </p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
