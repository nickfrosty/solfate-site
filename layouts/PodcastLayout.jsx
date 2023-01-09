import Layout from "~/layouts/default";
import Link from "next/link";
import { parseTemplate } from "zumo";

import { EpisodeMeta } from "~/components/podcast/EpisodeMeta";
import { ProseContent } from "~/components/content/ProseContent";
import { NextPrevEpisode } from "~/components/podcast/NextPrevEpisode";
import { EpisodeHosts } from "~/components/podcast/EpisodeHosts";
import TagListing from "~/components/content/TagListing";

export default function PodcastLayout({ config, post, next, prev }) {
  // TODO: support setting a canonical tag, likely via a util function to standardize the data

  // extract the used elements from the `post`
  let { meta = {}, content = null } = post;

  // compute the page's `href` based on the template
  const href = parseTemplate(config.hrefTemplate, {
    baseHref: config.baseHref,
    slug: post.slug,
  });

  // define the site's address for use in social feeds
  const SITE_ADDRESS =
    process?.env?.NODE_ENV?.toLowerCase() === "production"
      ? "https://solfate.com"
      : "https://podcast.solfate.pages.dev";

  // define the seo settings to display the audio on social
  const seo = {
    twitter: {
      cardType: "summary_large_image",
    },
    openGraph: {
      type: "website",
      url: `${SITE_ADDRESS}${href}`,
      // site_name: "Solfate",
      images: [
        {
          url: `${SITE_ADDRESS}/media/podcast/cover1.jpg`,
          width: 800,
          height: 800,
          alt: "Solfate Labs",
        },
      ],
    },
  };

  return (
    <Layout seo={{ ...meta, ...seo }} className={``}>
      <section className="space-y-8 container-prose">
        <section className="space-y-3">
          <h1 className="">
            <Link href={href}>
              <a className="text-4xl shadow-orange-lg">
                {meta?.title || "Podcast Episode"}
              </a>
            </Link>
          </h1>

          <EpisodeMeta
            meta={meta}
            baseHref={config.baseHref}
            tagHrefTemplate={config.tagHrefTemplate}
          />
        </section>

        {meta?.tags ? (
          <div className="justify-between mt-5 flexer">
            <div className="line-clamp-1">
              <TagListing tags={meta.tags} />
            </div>
          </div>
        ) : (
          <></>
        )}

        {/* <p className="text-xl md:text-2xl">{meta.description}</p> */}

        <EpisodeHosts guests={post.meta?.guests} />
      </section>

      <main id="notes" className="pt-0 container-prose">
        {/* <h2 className="text-3xl">Show Notes</h2> */}
        <ProseContent content={content} />
      </main>

      {/* <section className="">
        <div className="space-y-3 container-prose">
          <h2 className="text-3xl">Episode Hosts</h2>
          <EpisodeHosts guests={post.meta?.guests} />
        </div>
      </section> */}

      <section className="">
        <div className="container-prose">
          <NextPrevEpisode next={next} prev={prev} hrefBase={config.baseHref} />
        </div>
      </section>
    </Layout>
  );
}
