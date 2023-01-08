/**
 * generatePodcastRss.js
 *
 * This script is meant to be run at build time to generate an valid podcast RSS feed
 * (residing at `public/podcast/rss.xml`), based on the current published episodes in
 * the `content/podcast/episodes` directory.
 */

const { Podcast } = require("podcast");
// import  { DateTime } = require("luxon");
const { writeFileSync, mkdirSync, statSync } = require("fs");

const {
  getDateByPriority,
  getDocsByPath,
  sortByPriorityDate,
} = require("zumo");

// define the site's address
const SITE_ADDRESS =
  process.env?.NODE_ENV?.toLowerCase() === "production"
    ? "https://solfate.com"
    : "https://podcast.solfate.pages.dev";

// define the base path to save the generated RSS files
const rssBasePath = `./public/podcast/`;

// define some reusable author data
const config = {
  siteName: "Solfate Labs",
  owner: "Nick Frostbutter",
  email: "podcast@solfate.com",
  siteUrl: SITE_ADDRESS,
  link: `${SITE_ADDRESS}/podcast`,
  feedUrl: `${SITE_ADDRESS}/podcast/rss.xml`,
  coverImageUrl: `${SITE_ADDRESS}/media/podcast/cover1.jpg`,

  // meta info
  title: "Solfate Podcast",
  description:
    "Audio commentary from two developers building on Solana, Nick (@nickfrosty) and James (@jamesrp13).",
};

const feedOptions = {
  title: config.title,
  description: config.description,
  // id: author.website,
  // link: author.website,
  generator: config.siteName,
  favicon: `${config.siteUrl}/favicon.ico`,
  copyright: `All rights reserved then, now, and forever, ${config.siteName}`,
  // author,

  feedUrl: config.feedUrl,
  siteUrl: config.siteUrl,
  imageUrl: config.coverImageUrl,
  docs: config.link,
  author: config.owner,
  managingEditor: config.owner,
  webMaster: config.owner,
  language: "en",
  // pubDate: "", // when not defined, it will use the build date
  ttl: 60,
  itunesAuthor: config.siteName,
  itunesSubtitle: config.description,
  itunesSummary: config.description,
  itunesOwner: {
    name: config.owner,
    email: config.email,
  },
  itunesExplicit: false,

  // categories: ["Category 1", "Category 2", "Category 3"],
  itunesCategory: [
    {
      text: "Entertainment",
      subcats: [
        {
          text: "Television",
        },
      ],
    },
  ],
  itunesImage: config.imageUrl,
};

(async () => {
  let [episodes] = await Promise.all([
    getDocsByPath("podcast/episodes", {
      metaOnly: false,
      hideDrafts: true,
    }),
  ]);

  // construct the base podcast RSS feed
  const feed = new Podcast(feedOptions);

  // read in all of the desired posts to generate the feed with
  console.log("episodes found:", episodes?.length || "none");

  // sort the episodes with newest first
  sortByPriorityDate(episodes, "desc")
    // loop over each post in the listing
    .map((post, index) => {
      console.log(`ep ${post.slug} --`, post.meta.title);

      // compute the episode specific url
      const url = `${config.siteUrl}/podcast/${post.slug}`;

      // compute the episode specific cover image, using the show's master as the fallback
      const image = () => {
        if (post?.meta?.coverImage || post?.meta?.image)
          return `${config.siteUrl}/media/podcast${
            post?.meta?.coverImage || post?.meta?.image
          }`;

        // return nothing when no image was found
        return config.coverImageUrl;
      };

      // construct sanitized content
      let content;

      // TODO: convert all relative/internal links to using the absolute urls
      // TODO: convert the content into html, from the provided markdown
      content = post.content;

      // TODO: auto add the "about the hosts" section to the bottom of the content for the RSS fees

      // construct a RSS item to add to the feed
      feed.addItem({
        itunesNewFeedUrl: config.feedUrl,

        id: url,
        // guid: url, // optional, defaults to `url`
        link: url,
        url: url,
        // author: [author],
        date: new Date(getDateByPriority(post.meta)),
        title: post.meta.title,
        image: image(),
        category: post.meta?.tags?.map((name) => ({ name })),
        description: post.meta.description,
        content,

        // categories: ["Category 1", "Category 2", "Category 3", "Category 4"], // optional - array of item categories
        author: "Guest Author", // optional - defaults to feed author property
        // enclosure: { url: "...", file: "path-to-file" }, // optional enclosure

        itunesAuthor: config.owner,
        itunesExplicit: false,
        itunesSubtitle: post.meta.description,
        itunesSummary: post.meta.description,
        itunesDuration: 12345,
      });
    });

  // create the rss feed's output directory, when needed
  try {
    if (!statSync(rssBasePath).isDirectory)
      throw Error("Output directory not found");

    // if here, then the output directory exists
  } catch (err) {
    console.log(`--- Creating output directory at "${rssBasePath}"`);
    mkdirSync(rssBasePath);
  }

  // build the feed for output
  const xml = feed.buildXml();
  // console.log(xml);

  // actually save the podcast rss feed
  writeFileSync(`${rssBasePath}${"rss"}.xml`, xml, {
    encoding: "utf-8",
  });

  console.log("New podcast feed generated!");
})();

/*

## Find us online

Show notes on Solfate.com: https://solfate.com/podcast/xxxx

Nick

- follow on twitter: [@nickfrosty](https://twitter.com/nickfrosty)
- follow on github: [github.com/nickfrosty](https://github.com/nickfrosty)
- website: [https://nick.af](nick.af)

James

- follow on twitter: [@jamesrp13](https://twitter.com/jamesrp13)
- follow on github: [github.com/jamesrp13](https://github.com/jamesrp13)

*/
