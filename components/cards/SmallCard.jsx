/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { generateSlug } from "~/toad/core";
import { FloatLabel } from "../content/FloatLabel";

export function SmallCard({
  title,
  image = null,
  baseHref = null,
  href = null,
  description = null,
  children = null,
  slug = null,
  draft = null,
  className = "",
}) {
  // construct the `href` location, when not provided
  if (!href) href = `${baseHref || ""}/${slug || generateSlug(title)}`;

  return (
    <Link href={href || ""}>
      <a className={`p-0 card hover-outline ${className || ""}`}>
        <div className="block flex-shrink-0 w-full h-60 bg-gray-900">
          {/* TODO: onerror load a default image, or remove the image? */}
          {draft && draft === true && (
            <FloatLabel label={"draft"} overlay={true} />
          )}
          {image ? (
            <img src={image} className="" alt={title || "[unknown]"} />
          ) : (
            ""
          )}
        </div>
        <div className="p-5 space-y-3">
          <h2 className="text-2xl font-bold">{title || "[unknown]"}</h2>

          {children || description ? (
            <p className="text-gray-500">{children || description}</p>
          ) : (
            ""
          )}
        </div>
      </a>
    </Link>
  );
}
