/* eslint-disable @next/next/no-img-element */
// import { StarIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { NewsPost } from "contentlayer/generated";
import Link from "next/link";
// import { FloatLabel } from "@/components/content/FloatLabel";
import styles from "@/styles/card.module.css";

// used for SmallCard, LargeCard, and BlogCard
type CardComponentProps = SimpleComponentProps & {
  baseHref?: string;
  post: NewsPost;
  imageFocus?: "center" | "left" | "right";
  actionButton?: {
    href: string;
    label: string;
  };
};

export function NewsCard({
  children,
  className,
  post,
  imageFocus = "center",
}: CardComponentProps) {
  return (
    <Link
      href={post?.href ?? "#"}
      className={clsx(styles["shadow-card"], "bg-white overflow-hidden")}
    >
      <span className="flex-shrink-0 block w-full bg-gray-200 rounded-t-lg h-60">
        {/* TODO: onerror load a default image, or remove the image? */}
        {/* {post?.draft === true && <FloatLabel label={"draft"} overlay={true} />} */}

        {post?.image && (
          <img
            src={post.image}
            className={clsx(
              `object-cover`,
              `object-${imageFocus}`,
              `relative left-0 w-full h-full`,
            )}
            alt={post.title || "[unknown]"}
          />
        )}
      </span>
      <span className="block p-5 space-y-3">
        <h2 className="text-2xl font-bold">{post?.title || "[unknown]"}</h2>

        {children || post?.description ? (
          <p className="text-gray-500">{children || post.description}</p>
        ) : null}
      </span>
    </Link>
  );

  return (
    <Link
      href={post?.href ?? "#"}
      className={clsx(
        `!p-0`,
        "block w-full overflow-hidden rounded-xl",
        "border border-gray-300",
        className,
        "hover:outline hover:outline-offset-4 hover:outline-2 hover:outline-yellow-500 hover:border-transparent",
        // featured ? "featured-outline" : "",
      )}
    >
      {/* {featured && (
          <span className="absolute z-10">
            <div
              className={clsx(
                "inline-block top-0 p-2 text-gray-900 bg-yellow-500 rounded-tl-lg rounded-br-lg",
              )}
            >
              <StarIcon className="icon-md" />
            </div>
          </span>
        )} */}

      <span className="flex-shrink-0 block w-full bg-gray-900 h-60">
        {/* TODO: onerror load a default image, or remove the image? */}
        {/* {post?.draft === true && <FloatLabel label={"draft"} overlay={true} />} */}

        {post?.image && (
          <img
            src={post.image}
            className={clsx(
              `object-cover`,
              `object-${imageFocus}`,
              `relative left-0 w-full h-full`,
            )}
            alt={post.title || "[unknown]"}
          />
        )}
      </span>
      <span className="p-5 space-y-3">
        <h2 className="text-2xl font-bold">{post?.title || "[unknown]"}</h2>

        {children || post?.description ? (
          <p className="text-gray-500">{children || post.description}</p>
        ) : null}
      </span>
    </Link>
  );
}
