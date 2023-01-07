/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import DisplayDate from "~/components/content/DisplayDate";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { CalendarDaysIcon, MicrophoneIcon } from "@heroicons/react/24/outline";

export function NextPrevEpisode({ next = null, prev = null, hrefBase = "" }) {
  return (
    <section className="grid gap-8 w-full md:grid-cols-2">
      {prev !== undefined && prev?.slug ? (
        <Link href={`${hrefBase}/${prev.slug}`}>
          <a className="place-self-start space-y-2 w-full btn btn-indigo">
            <span className="space-x-6 flexer">
              <ArrowLeftIcon className="w-4 h-4 text-white" />

              <span className="line-clamp-1">Previous Episode</span>

              {/* <span className="space-x-6 flexer">
                <span className="space-x-2 md:mt-0 flexer">
                  <MicrophoneIcon className="icon-sm" />
                  <span>{`Ep ${parseInt(
                    prev?.meta?.slug,
                  ).toLocaleString()}`}</span>
                </span>

                <span className="space-x-2 md:mt-0 flexer">
                  <CalendarDaysIcon className="icon-sm" />
                  <DisplayDate {...(prev?.meta || {})} />
                </span>
              </span> */}
            </span>

            {/* <span className="block line-clamp-1">
              {prev?.meta?.title || "Previous Episode"}
            </span> */}
          </a>
        </Link>
      ) : (
        <div></div>
      )}

      {next !== undefined && next?.slug ? (
        <Link href={`${hrefBase}/${next.slug}`}>
          <a className="place-self-start space-y-2 w-full btn btn-indigo">
            <span className="justify-between space-x-6 flexer">
              {/* <span className="space-x-6 flexer">
                <span className="space-x-2 md:mt-0 flexer">
                  <MicrophoneIcon className="icon-sm" />
                  <span>{`Ep ${parseInt(
                    next?.meta?.slug,
                  ).toLocaleString()}`}</span>
                </span>

                <span className="space-x-2 md:mt-0 flexer">
                  <CalendarDaysIcon className="icon-sm" />
                  <DisplayDate {...(next?.meta || {})} />
                </span>
              </span> */}
              <span className="line-clamp-1">Next Episode</span>

              <ArrowRightIcon className="w-4 h-4 text-white" />
            </span>
            {/* <span className="block line-clamp-1">
              {next?.meta?.title || "Next Episode"}
            </span> */}
          </a>
        </Link>
      ) : (
        <div></div>
      )}
    </section>
  );
}