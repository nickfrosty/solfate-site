/* eslint-disable @next/next/no-img-element */
import { RSS_PLATFORMS } from "~/lib/podcast";

export default function RssLinks() {
  return (
    <span className="space-x-3 flexer">
      {RSS_PLATFORMS.map((item, index) => (
        <a
          key={index}
          href={item.href}
          title={item.label}
          className="inline-flex"
          target="_blank"
          rel="noreferrer"
        >
          <img src={item.icon} alt={item.label} className="icon-md" />
        </a>
      ))}
    </span>
  );
}
