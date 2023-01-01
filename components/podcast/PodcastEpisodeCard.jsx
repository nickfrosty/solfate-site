/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import styles from "~/styles/card.module.css";

import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { EpisodeMeta } from "~/components/podcast/EpisodeMeta";
import TagListing from "~/components/content/TagListing";

export default function PodcastEpisodeCard({ meta }) {
  // only show drafts in prod
  if (meta?.draft === true && process?.env?.NODE_ENV !== "development") return;

  // compute the podcast episode link
  const href = `/podcast/${meta.slug}`;

  return (
    <div
      className={`${styles.card} ${styles.shadow} bg-white text-black p-4 md:p-7 space-y-4`}
    >
      <div className="space-y-2">
        <Link href={href}>
          <a className="link">
            <h4 className="text-xl md:text-3xl">
              {meta?.title || "Podcast Episode"}
            </h4>
          </a>
        </Link>

        <EpisodeMeta meta={meta} />
      </div>

      <p className="">{meta?.description || ""}</p>

      <div className="justify-between items-center space-y-3 md:flex">
        {meta?.tags ? (
          <div className="line-clamp-1">
            <TagListing tags={meta.tags} />
          </div>
        ) : (
          <></>
        )}

        <Link href={href}>
          <a className="place-content-end space-x-2 link flexer">
            <span>Listen</span>
            <ArrowRightIcon className="icon-sm" />
          </a>
        </Link>
      </div>
    </div>
  );
}
