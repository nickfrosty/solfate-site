/* eslint-disable @next/next/no-img-element */
import DefaultLayout from "~/layouts/default";
// import { basicMeta } from "~/utils/seoMetaData";
import { LargeCard } from "~/components/cards/LargeCard";
import { SmallCard } from "~/components/cards/SmallCard";

import { getDocsByPath, filterDocs } from "../../toad/core/index";

// construct the meta data for the page
// const metaData = basicMeta({
const metaData = {
  title: "Articles",
  baseHref: "/articles",
  description: "",
};

export async function getStaticProps({ params }) {
  if (process && process.env?.NODE_ENV !== "development")
    return { notFound: true };

  const posts = await getDocsByPath("articles");

  // extract the `featured` posts
  const featured = filterDocs(posts, { featured: true }, 2);

  // remove the featured from the posts
  // posts = posts?.filter(item => )

  // give the 404 page when the post is not found
  // if (!posts || !posts?.length) return { notFound: true };

  return {
    props: { posts, featured },
  };
}

export default function ArticlesPage({ posts, featured }) {
  return (
    <DefaultLayout seo={metaData}>
      {featured && featured?.length ? (
        <section className="double-wide-cards">
          {featured.map((item) => {
            return (
              <LargeCard
                key={item.updatedAt}
                {...item?.meta}
                baseHref={metaData.baseHref}
              ></LargeCard>
            );
          })}
        </section>
      ) : (
        <></>
      )}

      <section className="card-listing">
        {posts &&
          posts.map((item) => {
            return (
              <SmallCard
                key={`${item.id}-${item.updatedAt}`}
                {...item?.meta}
                baseHref={metaData.baseHref}
              />
            );
          })}
      </section>
    </DefaultLayout>
  );
}
