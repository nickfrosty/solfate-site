/* eslint-disable @next/next/no-img-element */
import {
  CalendarDaysIcon,
  ClockIcon,
  MicrophoneIcon,
} from "@heroicons/react/24/outline";
import DisplayDate from "~/components/content/DisplayDate";

export function EpisodeMeta({ meta = null, className = "" }) {
  return (
    <section
      className={`flex flex-wrap items-center space-x-3 w-full font-mono tracking-wide text-gray-500 md:space-x-6 ${className}`}
    >
      <span className="hidden flex-shrink items-center space-x-2 whitespace-nowrap sm:flex">
        <MicrophoneIcon className="icon-sm" />
        <span>{`Ep ${parseInt(meta?.slug).toLocaleString()}`}</span>
      </span>

      <span className="col-span-2 space-x-2 whitespace-nowrap flexer">
        <CalendarDaysIcon className="icon-sm" />
        <DisplayDate
          date={meta?.date}
          updatedAt={meta?.updatedAt}
          createdAt={meta?.createdAt}
        />
      </span>

      <span className="space-x-2 whitespace-nowrap flexer">
        <ClockIcon className="icon-sm" />
        <span>{meta.duration}</span>
      </span>
    </section>
  );
}
