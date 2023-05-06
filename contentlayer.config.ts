import {
  defineDocumentType,
  makeSource,
  FieldDefs,
} from "contentlayer/source-files";

const slugRegex = new RegExp(/^(.*)(.md|.mdx)/gi);

function createSlug(slug: string) {
  const splitter: string | string[] = slug.toLowerCase().split("/");
  return splitter[splitter.length - 1].split(".md")[0].replace(/\s+/g, "-");
}

/**
 * Podcast episode schema
 */
export const Episode = defineDocumentType(() => ({
  name: "Episode",
  filePathPattern: `podcast/episodes/**/*.md`,
  fields: {
    title: {
      type: "string",
      description: "The title of the episode",
      required: true,
    },
    description: {
      type: "string",
      description:
        "Brief description of the episode (also used in the SEO metadata)",
      required: true,
    },
    tags: {
      type: "string",
      // type: "list",
      // of: { type: "string" },
      description: "Comma separated listing of tags",
      required: false,
    },
    date: {
      type: "date",
      description: "The public date of the episode",
      required: false,
    },
    draft: {
      type: "boolean",
      description: "Draft status of the episode",
      required: false,
    },
    featured: {
      type: "boolean",
      description: "Whether or not this episode is featured",
      required: false,
    },

    transistorUrl: {
      type: "string",
      description:
        "Brief description of the episode (also used in the SEO metadata)",
      required: true,
    },
    duration: {
      type: "string",
      description: "Duration of the episode",
      required: false,
    },
  },
  computedFields: {
    ep: {
      description: "Episode number (aka the file name)",
      type: "string",
      resolve: (record) => createSlug(record._id),
    },
    draft: {
      description: "Draft status of the episode",
      type: "boolean",
      resolve: (record) =>
        record?.draft ?? record._raw.sourceFileName.startsWith("_"),
    },
    slug: {
      description: "Computed slug of the episode",
      type: "string",
      resolve: (record) => record?.slug ?? createSlug(record._id),
    },
    href: {
      description: "Local url path of the episode",
      type: "string",
      resolve: (record) => `/podcast/${record?.slug ?? createSlug(record._id)}`,
    },
  },
}));

/**
 * Podcast episode schema
 */
export const NewsPost = defineDocumentType(() => ({
  name: "NewsPost",
  filePathPattern: `news/**/*.md`,
  fields: {
    title: {
      type: "string",
      description: "The title of the news post",
      required: true,
    },
    description: {
      type: "string",
      description:
        "Brief description of the news post (also used in the SEO metadata)",
      required: true,
    },
    date: {
      type: "date",
      description: "The public date of the news post",
      required: true,
    },
    draft: {
      type: "boolean",
      description: "Draft status of the news post",
      required: false,
    },
    featured: {
      type: "boolean",
      description: "Whether or not this news post is featured",
      required: false,
    },

    tags: {
      type: "string",
      // type: "list",
      // of: { type: "string" },
      description: "Comma separated listing of tags",
      required: false,
    },

    image: {
      type: "string",
      description: "Cover image for the news post",
      required: false,
    },
  },
  computedFields: {
    draft: {
      description: "Draft status of the news post",
      type: "boolean",
      resolve: (record) =>
        record?.draft ?? record._raw.sourceFileName.startsWith("_"),
    },
    slug: {
      description: "Computed slug of the news post",
      type: "string",
      resolve: (record) => record?.slug ?? createSlug(record._id),
    },
    image: {
      description: "Computed cover image of the news post",
      type: "string",
      resolve: (record) =>
        record?.image ?? "/media/solana-newsletter-cover.jpg",
    },
    href: {
      description: "Local url path of the news post",
      type: "string",
      resolve: (record) => `/news/${record?.slug ?? createSlug(record._id)}`,
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Episode, NewsPost],
});
