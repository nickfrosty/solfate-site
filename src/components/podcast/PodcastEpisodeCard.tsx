/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import styles from "@/styles/card.module.css";

import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { EpisodeMeta } from "@/components/podcast/EpisodeMeta";
import TagListing from "@/components/content/TagListing";

type ComponentProps = { meta: any };

export default function PodcastEpisodeCard({ meta }: ComponentProps) {
  // only show drafts in dev
  if (meta?.draft === true && process?.env?.NODE_ENV != "development")
    return <></>;

  // compute the podcast episode link
  const href = `/podcast/${meta.slug}`;

  return (
    <div
      className={`${styles.card} ${styles.shadow} bg-white text-black p-4 md:p-7 space-y-4`}
    >
      <div className="space-y-2">
        <Link href={href} className="link">
          <h4 className="text-xl md:text-3xl">
            {meta?.title || "Podcast Episode"}
          </h4>
        </Link>

        <EpisodeMeta meta={meta} />
      </div>

      <p className="">{meta?.description || ""}</p>

      <div className="items-center justify-between space-y-3 md:flex">
        {!!meta?.tags && (
          <div className="line-clamp-1">
            <TagListing tags={meta.tags} />
          </div>
        )}

        <Link href={href} className="space-x-2 place-content-end link flexer">
          <span>Listen</span>
          <ArrowRightIcon className="icon-sm" />
        </Link>
      </div>
    </div>
  );
}
