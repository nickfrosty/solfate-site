// import type { PaginationProps } from "@@/types";
// import type { Article, Blog } from "contentlayer/generated";
import { NewsCard } from "./NewsCard";
import { NewsPost } from "contentlayer/generated";

// import { Pagination } from "@/components/content/Pagination";

type ComponentProps = {
  className?: string;
  baseHref?: string;
  posts: NewsPost[];
  //   pagination: PaginationProps;
};

export function NewsCardGrid({
  className,
  baseHref,
  //   pagination,
  posts = [],
}: ComponentProps) {
  return (
    <>
      <section className="card-grid">
        {posts?.map((item) => (
          <NewsCard
            key={`small-${item.slug}`}
            post={item}
            imageFocus={"center"}
            baseHref={baseHref}
          />
        )) ?? null}
      </section>

      {/* {pagination && typeof pagination === "object" ? (
        <Pagination {...pagination} />
      ) : null} */}
    </>
  );
}
