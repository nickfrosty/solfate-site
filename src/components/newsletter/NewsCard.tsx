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
      href={post.href || "#"}
      className={clsx(styles["shadow-card"], "bg-white overflow-hidden group")}
    >
      <span className="flex-shrink-0 block w-full bg-gray-200 rounded-t-lg h-50">
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
            alt={post.title || "Solana News"}
          />
        )}
      </span>
      <span className="block p-5 space-y-3">
        <h3 className="text-2xl font-bold group-hover:underline">
          {post.title}
        </h3>

        {children || post.description ? (
          <p className="text-gray-500">{children || post.description}</p>
        ) : null}
      </span>
    </Link>
  );
}
