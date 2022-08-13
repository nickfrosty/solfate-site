import Link from "next/link";
import { HashtagIcon } from "@heroicons/react/solid";

export function Tag({
  className = "",
  tag = "",
  icon = true,
  href = null,
  hrefTemplate = `/browse/{{tag}}`,
}) {
  tag = tag.trim();

  // create the actual href location (when not already provided)
  if (!href) {
    href = hrefTemplate.replace(
      `{{tag}}`,
      encodeURIComponent(tag.toLowerCase()),
    );
  }

  if (tag) {
    return (
      <Link href={href}>
        <a>
          <span
            className={`tag flexer ${className} w-min font-semibold whitespace-nowrap`}
          >
            {icon && <HashtagIcon className="mx-auto w-4 h-4" />}
            <span>{tag}</span>
          </span>
        </a>
      </Link>
    );
  }
}
