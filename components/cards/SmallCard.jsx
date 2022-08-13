/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { generateSlug } from "~/toad/core";
import { FloatLabel } from "../content/FloatLabel";

export function SmallCard(meta) {
  // extract the commonly used `meta` tags
  let {
    draft = null,
    title,
    image = null,
    slug = null,
    baseHref = null,
    href = null,
    description = null,
    blurb = null,
    children = null,
    className = "",
  } = meta;

  // construct the `href` location, when not provided
  if (!href) href = `${baseHref || ""}/${slug || generateSlug(title)}`;

  // handle the `image_focus` option
  const imageFocusSide = `object-${
    meta?.image_focus?.toLowerCase() || "center"
  }`;

  return (
    <Link href={href || ""}>
      <a className={`p-0 card hover-outline ${className || ""}`}>
        <div className="block flex-shrink-0 w-full h-60 bg-gray-900">
          {/* TODO: onerror load a default image, or remove the image? */}
          {draft && draft === true && (
            <FloatLabel label={"draft"} overlay={true} />
          )}
          {image ? (
            <img
              src={image}
              className={`${imageFocusSide} object-cover object-left relative left-0 w-full h-full`}
              alt={title || "[unknown]"}
            />
          ) : (
            ""
          )}
        </div>
        <div className="p-5 space-y-3">
          <h2 className="text-2xl font-bold">{title || "[unknown]"}</h2>

          {children || blurb || description ? (
            <p className="text-gray-500">{children || blurb || description}</p>
          ) : (
            ""
          )}
        </div>
      </a>
    </Link>
  );
}
