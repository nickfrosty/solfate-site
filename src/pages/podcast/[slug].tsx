import type { NextSeoProps } from "next-seo";
import PodcastLayout from "@/layouts/PodcastLayout";
import { Episode, allEpisodes } from "contentlayer/generated";

// define some config data
const config = {
  baseHref: "/podcast",
  hrefTemplate: "{{baseHref}}/{{slug}}",
  tagHrefTemplate: "{{baseHref}}/tag/{{tag}}",
  contentDir: "podcast",
  maxTagCount: 3,
};

// construct the meta data for the page
// const metaData : NextSeoProps = {
//   title: "Podcast",
//   description: "",
// };

// get the listing of all of the markdown files
export async function getStaticPaths() {
  return {
    paths: allEpisodes.map((item) => {
      return {
        params: {
          slug: item.slug,
        },
      };
    }),
    fallback: true,
  };
}

export async function getStaticProps({
  params: { slug },
}: {
  params: { slug: string };
}) {
  // define episode placeholders
  let [episode, next, prev]: Array<Episode | null> = [null, null, null];

  // get the current episode being viewed
  const episodes = allEpisodes.sort(
    (a, b) => parseFloat(b.slug) - parseFloat(a.slug),
  );

  // loop and locate all the desired episodes
  for (let i = 0; i < episodes.length; i++) {
    // ignore all except the current `slug`
    if (episodes[i].slug != slug) continue;

    episode = episodes[i];

    // do not allow prev episode to have slug lower than 1
    if (i > 0) next = episodes[i - 1];

    // do not exceed the number of episodes
    if (i < episodes.length - 1) prev = episodes[i + 1];
  }

  // todo: each of the episodes have the `body.html` field by default.
  // todo: this could be removed to send less data to the client

  if (!episode)
    // 404 when the record is not found
    return { notFound: true };

  // 404 for `draft` pages (in all non dev envs)
  if (
    episode?.draft === true &&
    process &&
    process.env?.NODE_ENV !== "development"
  )
    return { notFound: true };

  return {
    props: { episode, next, prev },
  };
}

type PageProps = {
  episode: Episode;
  next?: Episode;
  prev?: Episode;
};

export default function Page(props: PageProps) {
  return <PodcastLayout {...props} />;
}
