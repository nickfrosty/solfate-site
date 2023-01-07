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
  let { meta = {}, content = null, seo = {} } = post;

  // compute the page's `href` based on the template
  const href = parseTemplate(config.hrefTemplate, {
    baseHref: config.baseHref,
    slug: post.slug,
  });

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