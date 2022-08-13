/* eslint-disable @next/next/no-img-element */
import { DateTime } from "luxon";
import { FloatLabel } from "./FloatLabel";
import { Tag } from "./Tag";

export function ArticleMeta({ meta = null, className = "" }) {
  return (
    <section className={`${className} space-y-3`}>
      <p className="flexer space-x-2 tracking-wider text-gray-500">
        {meta?.draft === true && <FloatLabel overlay={false} />}

        {meta.updatedAt !== meta.createdAt ? (
          <span className="">
            Updated on{" "}
            {DateTime.fromISO(meta.updatedAt)
              .toFormat("MMM dd, yyyy")
              .toString()}
          </span>
        ) : (
          <span className="">
            Posted on{" "}
            {DateTime.fromISO(meta.createdAt)
              .toFormat("MMM dd, yyyy")
              .toString()}
          </span>
        )}

        {/* 
        <span className="block w-1 h-1 bg-gray-500 rounded-full"></span>
        <a
          href="https://twitter.com/nickfrosty"
          target="_blank"
          rel="noreferrer"
          className="link"
        >
          Nick Frostbutter
        </a> */}
      </p>

      {/* Post tags */}
      {meta?.tags && Array.isArray(meta.tags) ? (
        <p className="flexer">
          {meta.tags.map((tag) => (
            <Tag tag={tag} key={tag.id} />
          ))}
        </p>
      ) : (
        <></>
      )}
    </section>
  );
}
