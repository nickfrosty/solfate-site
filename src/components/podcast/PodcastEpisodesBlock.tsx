/* eslint-disable @next/next/no-img-element */
import PodcastEpisodeCard from "@/components/podcast/PodcastEpisodeCard";
import { Episode } from "contentlayer/generated";

type ComponentProps = SimpleComponentProps & {
  episodes: Array<Episode>;
  title: string;
};

export default function PodcastEpisodesBlock({
  episodes,
  title,
}: ComponentProps) {
  return (
    <section id="utility" className="py-8 text-white bg-indigo-500">
      {title && title && (
        <section className="my-8 space-y-3 text-center">
          <h2 className="text-5xl">{title}</h2>
          {/* <p className=""></p> */}
        </section>
      )}

      <section className="container grid gap-8 md:grid-cols-2">
        {/* <section className="max-w-3xl mx-auto space-y-6"> */}
        {episodes?.length > 0 &&
          episodes.map((episode, id) => (
            <PodcastEpisodeCard key={id} episode={episode} />
          ))}

        {/* {episodes.length > counter && (
            <div className="justify-center flexer">
              <button
                className="btn btn-indigo"
                onClick={() => setCounter((curr) => curr + 5)}
              >
                Load More Episodes
              </button>
            </div>
          )} */}
        {/* </section> */}
      </section>
    </section>
  );
}

type SocialLinksProps = SimpleComponentProps & {
  person: any;
  iconSize?: string;
};

export function SocialLinks({
  className,
  iconSize = "icon-sm",
  person,
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
