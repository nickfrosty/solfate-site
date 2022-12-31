/* eslint-disable @next/next/no-img-element */

const platforms = [
  {
    label: "RSS feed",
    href: "/podcast/rss.xml",
    icon: "/icons/rss.svg",
  },
  {
    label: "Apple Podcast",
    href: "/podcast/rss.xml",
    icon: "/icons/apple.svg",
  },
  {
    label: "Spotify",
    href: "/podcast/rss.xml",
    icon: "/icons/spotify.svg",
  },
];

export default function RssLinks() {
  return (
    <span className="space-x-3 flexer">
      {platforms.map((item, index) => (
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
