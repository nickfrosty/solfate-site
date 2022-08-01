/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ChevronDoubleRightIcon } from "@heroicons/react/solid";

export function Breadcrumbs({
  parent = null,
  href = null,
  meta = null,
  image = null,
  children = null,
  className = "",
}) {
  // construct the link hrefs
  if (!href) href = `${parent?.href || ""}/${meta.slug}`;

  return (
    <section
      className={`${className} flex justify-start items-center space-x-2 text-base font-bold tracking-wide`}
    >
      {parent?.href ? (
        <Link href={parent.href}>
          <a className="link-muted">
            {parent?.label || parent?.title || "Parent"}
          </a>
        </Link>
      ) : (
        <Link href={"/"}>
          <a className="link-muted">{"Home"}</a>
        </Link>
      )}
      <ChevronDoubleRightIcon className="icon-xs" />
      <Link href={href}>
        <a className="link">{meta?.label || meta?.title || "[unknown]"}</a>
      </Link>
    </section>
  );
}
