import type { NextSeoProps } from "next-seo";
import { Episode, allEpisodes } from "contentlayer/generated";
import Layout from "@/layouts/default";
import Link from "next/link";

import { EpisodeMeta } from "@/components/podcast/EpisodeMeta";
import { ProseContent } from "@/components/content/ProseContent";
import { NextPrevEpisode } from "@/components/podcast/NextPrevEpisode";
import { EpisodeHosts } from "@/components/podcast/EpisodeHosts";
import TagListing from "@/components/content/TagListing";
import { SITE } from "@/lib/constants";

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

  // 404 when the record is not found
  if (!episode) return { notFound: true };
  // 404 for `draft` pages (in all non dev envs)
  else if (
    episode?.draft === true &&
    process &&
    process.env?.NODE_ENV !== "development"
  )
    return { notFound: true };

  // define the seo settings to display
  const seo: NextSeoProps = {
    canonical: `${SITE.url}/podcast/${episode.slug}`,
    openGraph: {
      title: `${episode?.ep ? `ep${episode.ep}: ` : ""}${episode.title}`,
    },
  };
  // todo: handle seo metadata settings to display the audio on social

  // if (post.meta.image)
  //  seo = {
  //   // twitter: {
  //   //   cardType: "summary_large_image",
  //   // },
  //   openGraph: {
  //     type: "website",
  //     url: `${SITE.url}${episode.href}`,
  //     // site_name: "Solfate",
  //     title: title(),
  //     images: [
  //       {
  //         url: `${SITE.url}/media/podcast/cover0.jpg`,
  //         width: 800,
  //         height: 800,
  //         alt: SITE.name,
  //       },
  //     ],
  //   },
  // };

  return {
    props: { seo, episode, next, prev },
  };
}

type PageProps = {
  seo: NextSeoProps;
  episode: Episode;
  next?: Episode;
  prev?: Episode;
};

export default function Page({ seo, episode, next, prev }: PageProps) {
  // note: some bug causes no episode to be provided on `generate`.
  // this prevents the build error
  if (!episode) return <>error</>;

  return (
    <Layout seo={{ ...episode, ...seo }} className={``}>
      <section className="space-y-8 container-prose">
        <section className="space-y-3">
          <h1 className="">
            <Link href={episode.href} className="text-4xl shadow-orange-lg">
              {episode.title || "Podcast Episode"}
            </Link>
          </h1>

          <EpisodeMeta episode={episode} />
        </section>

        {!!episode?.tags && (
          <div className="justify-between mt-5 flexer">
            <div className="line-clamp-1">
              <TagListing tags={episode.tags} maxTagCount={5} />
            </div>
          </div>
        )}

        {episode?.transistorUrl && episode?.transistorUrl && (
          <iframe
            width="100%"
            height="180"
            frameBorder="no"
            scrolling="no"
            seamless
            src={episode.transistorUrl}
            className="border-0"
          ></iframe>
        )}

        {/* <p className="text-xl md:text-2xl">{meta.description}</p> */}

        <EpisodeHosts guests={false /*episode?.guests*/} />
      </section>

      <main id="notes" className="pt-0 container-prose">
        {/* <h2 className="text-3xl">Show Notes</h2> */}
        <ProseContent content={episode.body?.raw || ""} />
      </main>

      {/* <section className="">
        <div className="space-y-3 container-prose">
          <h2 className="text-3xl">Episode Hosts</h2>
          <EpisodeHosts guests={post.meta?.guests} />
        </div>
      </section> */}

      <section className="">
        <div className="container-prose">
          <NextPrevEpisode next={next} prev={prev} hrefBase={"/podcast"} />
        </div>
      </section>
    </Layout>
  );
}
