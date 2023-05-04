/* eslint-disable @next/next/no-img-element */
import {
  CalendarDaysIcon,
  ClockIcon,
  MicrophoneIcon,
} from "@heroicons/react/24/outline";
import DisplayDate from "@/components/content/DisplayDate";
import { Episode } from "contentlayer/generated";

type ComponentProps = SimpleComponentProps & {
  episode: Episode;
};

export function EpisodeMeta({ episode, className = "" }: ComponentProps) {
  return (
    <section
      className={`flex flex-wrap items-center gap-8 w-full font-mono tracking-wide text-gray-500  ${className}`}
    >
      <span className="items-center flex-shrink hidden space-x-2 whitespace-nowrap sm:flex">
        <MicrophoneIcon className="icon-sm" />
        <span>{`Ep ${episode.ep}`}</span>
      </span>

      <span className="col-span-2 space-x-2 whitespace-nowrap flexer">
        <CalendarDaysIcon className="icon-sm" />
        <DisplayDate
          date={episode?.date}
          // updatedAt={episode?.updatedAt}
          // createdAt={episode?.createdAt}
        />
      </span>

      <span className="space-x-2 whitespace-nowrap flexer">
        <ClockIcon className="icon-sm" />
        <span>{episode.duration}</span>
      </span>
    </section>
  );
}
