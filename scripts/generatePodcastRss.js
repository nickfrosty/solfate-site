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

// define the base path to save the generated RSS files
const rssBasePath = `./public/podcast/`;

// define some reusable author data
const config = {
  siteName: "Solfate Labs",
  owner: "Nick Frostbutter",
  email: "podcast@solfate.com",
  siteUrl: "https://solfate.com",
  link: "https://solfate.com/podcast",
  feedUrl: "https://solfate.com/podcast/rss.xml",
  coverImageUrl: "https://solfate.com/podcast/cover.png",

  // meta info
  title: "Solfate Podcast",
  description: "Audio commentary from two developers building on Solana.",
};

// define the public owner
const owner = {
  name: "Nick Frostbutter",
  email: "podcast@solfate.com",
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
  author: owner.name,
  managingEditor: owner.name,
  webMaster: owner.name,
  language: "en",
  pubDate: "May 20, 2012 04:00:00 GMT",
  ttl: 60,
  itunesAuthor: config.siteName,
  itunesSubtitle: config.description,
  itunesSummary: config.description,
  itunesOwner: owner,
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
    // tokenHelper.getUserToken(username),
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

        itunesAuthor: owner.name,
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
