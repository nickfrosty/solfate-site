/* eslint-disable @next/next/no-img-element */
import { PODCAST_HOSTS } from "~/lib/podcast";

export default function PodcastHosts({}) {
  return (
    <section
      id="hosts"
      className="flex justify-center items-center mx-auto space-x-20"
    >
      {PODCAST_HOSTS.map((person, index) => (
        <div key={index} className="space-y-2 text-center">
          <span className="mx-auto avatar avatar-md">
            <img src={person.img} className="" alt={person.name} />
          </span>

          <h2 className="text-xl md:text-3xl">{person.name}</h2>

          <SocialLinks person={person} />
        </div>
      ))}
    </section>
  );
}

export function SocialLinks({ person, className = "" }) {
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
            className="icon-sm"
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
            className="icon-sm"
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
          <img src="/icons/link.svg" className="icon-sm" alt={person.website} />
        </a>
      )}
    </div>
  );
}
