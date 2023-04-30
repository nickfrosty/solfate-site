/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import styles from "@/styles/card.module.css";

import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { EpisodeMeta } from "@/components/podcast/EpisodeMeta";
import TagListing from "@/components/content/TagListing";
import { Episode } from "contentlayer/generated";

type ComponentProps = { episode: Episode };

export default function PodcastEpisodeCard({ episode }: ComponentProps) {
  // only show drafts in dev mode
  if (
    !episode ||
    (episode?.draft === true && process?.env?.NODE_ENV != "development")
  )
    return <></>;

  // console.log("episode::", episode);

  // compute the podcast episode link
  const href = `/podcast/${episode.slug}`;

  return (
    <div
      className={`${styles.card} ${styles.shadow} bg-white text-black p-4 md:p-7 space-y-4`}
    >
      <div className="space-y-2">
        <Link href={href} className="link">
          <h4 className="text-xl md:text-3xl">
            {episode.title || "Podcast Episode"}
          </h4>
        </Link>

        <EpisodeMeta episode={episode} />
      </div>

      <p className="">{episode?.description || ""}</p>

      <div className="items-center justify-between space-y-3 md:flex">
        {!!episode?.tags && (
          <div className="line-clamp-1">
            <TagListing tags={episode.tags} />
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
