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
    // href: {
    //   type: "string",
    //   description: "Predefined URL of the episode",
    //   required: false,
    // },
    // slug: {
    //   type: "string",
    //   description: "URL slug for the episode",
    //   required: false,
    // },
    ep: {
      type: "number",
      description: "(deprecated) episode number",
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
      resolve: (record) => record._id,
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

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Episode],
});
