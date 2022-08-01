/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { HashtagIcon } from "@heroicons/react/solid";

import { DateTime } from "luxon";

export function ArticleMeta({
  meta = null,
  hrefTemplate = `/browse/{{tag}}`,
  className = "",
}) {
  return (
    <section className={`${className} space-y-3`}>
      <p className="flexer space-x-2 tracking-wider text-gray-500">
        <span className="">
          Posted on{" "}
          {DateTime.fromISO(meta.createdAt).toFormat("MMM dd, yyyy").toString()}
        </span>
        {/* <span className="block w-1 h-1 bg-gray-500 rounded-full"></span>
        <a href="#" className="link">
          Nick Frostbutter
        </a> */}
      </p>

      {/* Post tags */}
      {false && meta?.tags && Array.isArray(meta.tags) ? (
        <p className="flexer">
          {meta.tags.map((tag) => {
            // tag = tag.trim();

            const href = hrefTemplate.replace(
              `{{tag}}`,
              encodeURIComponent(tag.toLowerCase()),
            );

            return (
              <Link href={href} key={tag.id}>
                <a>
                  <span className="tag flexer w-min font-semibold whitespace-nowrap">
                    <HashtagIcon className="mx-auto w-4 h-4" />
                    <span>{tag}</span>
                  </span>
                </a>
              </Link>
            );
          })}
        </p>
      ) : (
        <></>
      )}
    </section>
  );
}
