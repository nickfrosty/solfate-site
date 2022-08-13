/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/solid";
import { generateSlug } from "~/toad/core";
import { FloatLabel } from "../content/FloatLabel";

export function LargeCard(meta) {
  // extract the commonly used `meta` tags
  let {
    title,
    image = null,
    baseHref = "",
    href = "",
    slug = "",
    description = null,
    blurb = null,
    draft = null,
    children = null,
    actionButton = null,
    className = "",
  } = meta;

  // construct the `href` location, when not provided
  if (!href) href = `${baseHref || ""}/${slug || generateSlug(title)}`;

  // handle the `image_focus` option
  const imageFocusSide = `object-${
    meta?.image_focus?.toLowerCase() || "center"
  }`;

  return (
    <Link href={href}>
      <a
        className={`md:flex justify-between p-0 card hover-outline ${
          className || ""
        }`}
      >
        <div className="sm:max-h-72 md:max-h-80 md:w-1/2 pb-2/3 overflow-hidden flex-shrink-0 bg-gray-900">
          {draft && draft === true && (
            <FloatLabel label={"draft"} overlay={true} />
          )}

          {image ? (
            <img
              src={image}
              className={`${imageFocusSide} object-cover relative left-0 w-full h-full`}
              alt={title || "[unknown]"}
            />
          ) : (
            ""
          )}
        </div>
        <div className="md:p-5 flex-grow p-8 space-y-4">
          <h2 className="text-3xl font-bold">{title || "[unknown]"}</h2>
          {children || blurb || description ? (
            <p
              className={`text-gray-500 ${
                actionButton ? "line-clamp-4" : "line-clamp-6"
              }`}
            >
              {(children && children) || blurb || description}
            </p>
          ) : (
            ""
          )}

          {actionButton ? (
            <Link href={actionButton?.href || href || ""} passHref>
              <div className="btn btn-indigo inline-block w-min whitespace-nowrap">
                <span>
                  {actionButton?.label ||
                    (typeof actionButton === "string" && actionButton) ||
                    "[unknown]"}
                </span>
                <ArrowRightIcon className="icon-sm" />
              </div>
            </Link>
          ) : (
            ""
          )}
        </div>
      </a>
    </Link>
  );
}
