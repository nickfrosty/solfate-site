import PodcastLayout from "~/layouts/PodcastLayout";

import { generateStaticPaths, getDocBySlug, getDocMetaBySlug } from "zumo";

// define some config data
const config = {
  baseHref: "/podcast",
  hrefTemplate: "{{baseHref}}/{{slug}}",
  tagHrefTemplate: "{{baseHref}}/tag/{{tag}}",
  contentDir: "podcast",
  maxTagCount: 3,
};

// construct the meta data for the page
// const metaData = {
//   title: "Podcast",
//   description: "",
// };

const breadcrumbParents = {
  href: "/podcast",
  label: "Solfate Podcast",
};

// get the listing of all of the markdown files
export async function getStaticPaths() {
  return generateStaticPaths(config.contentDir, false);
}

export async function getStaticProps({ params }) {
  const post = await getDocBySlug(params?.slug, config.contentDir);

  // give the 404 page when the post is not found
  if (!post) return { notFound: true };

  // give 404 for `draft` pages in all non dev envs
  if (
    post?.meta?.draft === true &&
    process &&
    process.env?.NODE_ENV !== "development"
  )
    return { notFound: true };

  // // parse out the `next` and `prev` blog posts, when defined by the post's `meta`
  let [next, prev] = [null, null];

  // if (post?.meta?.nextPage)
  next = await getDocMetaBySlug(
    (parseInt(params?.slug) + 1).toString(),
    config.contentDir,
  );
  // negative numbers are no good :/
  if (parseInt(params?.slug) > 0)
    prev = await getDocMetaBySlug(
      (parseInt(params?.slug) - 1).toString(),
      config.contentDir,
    );

  // strip the tags from the `post`
  // post.meta.tags = null;
  // // TODO: add the `tag` based post browsing to these blog posts

  return {
    props: { post, next, prev },
  };
}

export default function Page(props) {
  return (
    <PodcastLayout
      {...props}
      config={config}
      breadcrumbParents={breadcrumbParents}
      breadcrumbShowHome={false}
    />
  );
}
