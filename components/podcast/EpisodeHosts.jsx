/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
// import Link from "next/link";
import { PODCAST_HOSTS } from "~/lib/constants";

import styles from "~/styles/card.module.css";
import { SocialLinks } from "~/components/podcast/PodcastHosts";
// import { StarIcon } from "@heroicons/react/24/solid";

export function EpisodeHosts({ guests, className = "" }) {
  // TODO: handle displaying `guests`

  return (
    <section id="hosts" className="grid gap-4 w-full md:gap-8 md:grid-cols-2">
      {PODCAST_HOSTS.map((person, index) => (
        <div key={index} className={clsx(styles["shadow-card"], "bg-white")}>
          <div className="flex p-4 space-x-4 md:space-x-6">
            <div className="flex-shrink-0 avatar avatar-sm">
              <img src={person.img} alt={person.name} />
            </div>

            <div className="flex-grow space-y-2">
              <div className="justify-between flexer">
                <h3 className="block text-2xl line-clamp-1">{person.name}</h3>
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
