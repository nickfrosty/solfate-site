/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import DisplayDate from "@/components/content/DisplayDate";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { CalendarDaysIcon, MicrophoneIcon } from "@heroicons/react/24/outline";
import { Episode } from "contentlayer/generated";

type ComponentProps = {
  next?: Episode;
  prev?: Episode;
  hrefBase?: string;
};

export function NextPrevEpisode({ next, prev, hrefBase = "" }: ComponentProps) {
  return (
    <section className="grid w-full gap-8 md:grid-cols-2">
      {!!prev && prev?.slug ? (
        <Link
          href={`${hrefBase}/${prev.slug}`}
          className="w-full space-y-2 place-self-start btn btn-lg btn-indigo"
        >
          <span className="gap-6 text-base flexer">
            <ArrowLeftIcon className="w-5 h-5 text-white" />

            <span className="line-clamp-1">Previous Episode</span>

            {/* <span className="space-x-6 flexer">
                <span className="space-x-2 md:mt-0 flexer">
                  <MicrophoneIcon className="icon-sm" />
                  <span>{`Ep ${prev.ep`}</span>
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
        </Link>
      ) : (
        <div></div>
      )}

      {!!next && next?.slug ? (
        <Link
          href={`${hrefBase}/${next.slug}`}
          className="w-full space-y-2 place-self-start btn btn-lg btn-indigo"
        >
          <span className="justify-between gap-6 flexer">
            {/* <span className="space-x-6 flexer">
                <span className="space-x-2 md:mt-0 flexer">
                  <MicrophoneIcon className="icon-sm" />
                  <span>{`Ep ${next.ep}`}</span>
                </span>

                <span className="space-x-2 md:mt-0 flexer">
                  <CalendarDaysIcon className="icon-sm" />
                  <DisplayDate {...(next?.meta || {})} />
                </span>
              </span> */}
            <span className="line-clamp-1">Next Episode</span>

            <ArrowRightIcon className="w-5 h-5 text-white" />
          </span>
          {/* <span className="block line-clamp-1">
              {next?.meta?.title || "Next Episode"}
            </span> */}
        </Link>
      ) : (
        <div></div>
      )}
    </section>
  );
}
