/* eslint-disable @next/next/no-img-element */
import { RSS_PLATFORMS } from "@/lib/podcast";

export default function RssLinks({ className = "" }) {
  return (
    <div className={`gap-4 flexer ${className}`}>
      {RSS_PLATFORMS.map((item, index) => (
        <a
          key={index}
          href={item.href}
          title={item.label}
          className="inline-flex"
          target="_blank"
          rel="noreferrer"
        >
          <img src={item.icon} alt={item.label} className="icon-lg" />
        </a>
      ))}
    </div>
  );
}
