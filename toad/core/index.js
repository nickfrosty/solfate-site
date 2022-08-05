// const fs = require("fs");
// const path = require("path");
// const matter = require("gray-matter");

import fs from "fs";
import path, { dirname } from "path";

import { DateTime } from "luxon";
import slugify from "slugify";

//
import matter from "gray-matter";

/*
    Define base constants
*/
const BASE_PATH = "content";
// const BASE_PATH = path.join(process.cwd(), "content");

////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Filter a listing of documents by the provided `filter` criteria on the `doc.meta` data
 * @param {array} docs array of documents to be filtered
 * @param {object} filters criteria to filter by
 * @param {number} limit max number of filtered documents to return
 * @returns
 */
export function filterDocs(docs, filters, limit = 0) {
  try {
    // parse each of the provided filters
    for (const [key, value] of Object.entries(filters)) {
      // do NOT parse arrays!
      if (Array.isArray(value)) return false;

      // filter the provided `docs` listing for the current working filter (aka `key`)
      docs = docs?.filter((item) => {
        // auto select the `meta` object from each document
        item = item?.meta;

        // check for exact match for the simple types of `boolean` and `string`
        if (typeof value === "boolean" || typeof value === "string")
          return item?.[key] === value;
        // parse each of the comparison operators
        else if (typeof value === "object") {
          if (value?.eq) return item?.[key] === value.eq;
          else if (value?.neq) return item?.[key] !== value.neq;
          else if (value?.gt) return item?.[key] > value.gt;
          else if (value?.gte) return item?.[key] >= value.gte;
          else if (value?.lt) return item?.[key] < value.lt;
          else if (value?.lte) return item?.[key] <= value.lte;
          else if (value?.startsWith)
            return item?.[key]?.startsWith(value.startsWith.toString());
          else if (value?.endsWith)
            return item?.[key]?.endsWith(value.endsWith.toString());
          else if (value?.contains?.toString())
            return item?.[key]?.indexOf(value.contains.toString()) >= 0;
          else return false;
        }
      });
    }

    // return false when no documents were found
    if (!docs || !docs?.length) return false;

    // return the final filtered (and limited) results
    return limit ? docs?.slice(0, limit) : docs;
  } catch (err) {
    console.warn("Unable to filter documents:", filters);
    console.warn(err);
  }
  return false;
}

/**
 * Retreive a markdown document from the `content` directory, parsed and ready to go
 * @param {string} slug slug of the file name to locate
 * @param {string} basePath (optional) folder path inside of the `content` folder to search for the given slug
 * @returns
 */
export async function getDocBySlug(slug, basePath = "") {
  try {
    // remove file extension from the slug
    slug = slug?.replace(/.md|.mdx|.html|.html$/, "") || false;

    // locate the document based on its `slug`
    const filePath = getFilePath({ slug, basePath });
    if (!filePath) return false;

    // load the doc and return it as requested
    const doc = await loadAndParseDoc(filePath);
    if (!doc) return false;
    return doc;
  } catch (err) {
    console.warn("Unable to locate document:", slug);
    console.warn(err);
  }
  return false;
}

/**
 * Retreive a listing of markdown documents from the given `searchPath` directory, parsed and ready to go
 * @param {string} searchPath base relative path of documents to locate
 * @returns `array` of documents located inside the `searchPath`
 */
export async function getDocsByPath(searchPath = "") {
  try {
    // crawl the `searchPath` for all the documents
    const files = crawlForFiles(searchPath, true);

    let docs = [];

    // load and parse each of the located docs
    for (let i = 0; i < files.length; i++) {
      // attempt to load the doc's meta info
      try {
        const doc = await loadAndParseDoc(files[i], true);
        if (doc) docs.push(doc);
      } catch (err) {
        console.warn("Unable to parse doc:", files[i]);
      }
    }

    if (!docs || !docs?.length) return false;
    return docs;
  } catch (err) {
    console.warn("Unable to locate path:", path);
    console.warn(err);
  }
  return false;
}

export function getFilePath(options) {
  // options structure
  // const struct = {
  // 	// either a path or a slug is required, but not both. Path will superceed the slug, since it is faster
  // 	path: "",
  // 	slug: "",
  // 	basePath: null, // base directory, inside of BASE_PATH
  // };

  if (!options?.slug) return false;

  // construct the base working path to search
  if (!options?.basePath) options.basePath = path.join(BASE_PATH);
  //   options.basePath = path.join(BASE_PATH, options.basePath);

  // check for file based routing (fastest)
  if (
    options?.slug &&
    fs.existsSync(path.join(options.basePath, `${options?.slug}.md`))
  )
    return path.join(options.basePath, `${options?.slug}.md`);

  // when not found in file based routing, begin crawling...
  const files = crawlForFiles(options.basePath, true) || [];

  const file =
    files?.filter((item) => {
      if (!item) return false;

      const slug = generateSlug(item);

      // TODO: I think there are more ways to accept the slugs here...

      if (item?.slug && options?.slug && item.slug === options.slug)
        return item;
      else if (slug === (options?.slug || generateSlug(options?.path)))
        return item;

      return false;
    })[0] || false;

  if (file && fs.existsSync(path.join(file))) return path.join(file);
  else return false;
}

/**
 * Load and parse a the file from the given `filePath`, making it ready for the frontend.
 * @param {string} filePath path to the file to load and parse
 * @param {boolean} metaOnly whether or not to only parse/return the meta data
 * @returns
 */
export async function loadAndParseDoc(filePath, metaOnly = false) {
  try {
    // read the file from the local file system
    const stats = fs.statSync(path.join(filePath));
    let file = fs.readFileSync(path.join(filePath), "utf-8");
    file = matter(file);

    // extract the desired attributes and values
    // construct the parsed 'data' to return
    const data = {
      path: filePath,
      meta: file?.data || {},
      content: metaOnly ? null : file?.content,
      slug: null,
    };

    // enable the user to override the `updatedAt` date from the front matter
    data.meta.createdAt = DateTime.fromJSDate(stats.birthtime).toString();

    if (data?.meta?.updatedAt) {
      let tmp = new Date(data?.meta?.updatedAt);

      if (tmp instanceof Date && !isNaN(tmp).valueOf()) {
        // console.log("valid and parse");
        data.updatedAt = DateTime.fromISO(tmp.toISOString()).toString();
      }
      // else invalid date and keep it as the updated loaded from the file
    }

    // parse and set the `updatedAt` date
    if (!data?.meta?.updatedAt) {
      data.meta.updatedAt = DateTime.fromJSDate(stats.mtime).toString();
      // console.log(data);
    }

    // TODO: generate the SEO details?

    // TODO: generate the date stamps to be used in the file

    // generate and store the slug
    // TODO: handle user specified slugs in the front matter
    data.slug = generateSlug(data);
    data.meta.slug = data.slug;

    // TODO: this does not parse MDX files, or actually check to make sure the file extension is .MD

    return data;
  } catch (err) {
    console.warn("Unable to parse file");
    // throw err;
  }

  // default return
  return false;
}

export function generateSlug(item) {
  // example item
  const struct = {
    path: "", // string of the full file path
    meta: {}, // object of a files frontmatter meta data
  };

  let slug = "";

  /* 
    Order of precedence for slug generation:
      1. item as a string (e.g. the string path of the file or the title from the doc front matter)
      2. item.path
      // 3. item.meta.slug
      // 3. item.title
  */

  if (typeof item === "string") slug = item;
  else if (item?.path) slug = item.path;
  else return "";

  // for path based slugs, strip out the final item (aka file name slug) from the path
  if (slug.indexOf(path.sep) >= 0) {
    slug = slug.split(path.sep);
    slug = slug[slug.length - 1];
  }

  // extract the final slugified version of the slug
  const slug_options = { lower: true };
  slug = slugify(slug, slug_options);

  // NOTE: this may result in unexpected issues if the file name has multiple extensions (e.g ".md.bak")
  // but this should not be a problem for simple text files (like .md) or most image formats
  // TODO: fix this from being an issue...

  // strip the file extension
  return slug?.replace(/.md|.mdx|.html|.html$/, "") || slug;
}

/**
 * Generate a valid NextJS `getStaticPaths` object that is plug-and-play
 * @param {array|string} files name of the directory to crawl, or an array listing of an already crawled directory
 * @param {boolean} drafts whether or not to include items that are marked as `draft: true` in their front-matter
 * @returns a valid NextJS `getStaticPaths` object
 */
export function generateStaticPaths(files = null, drafts = false) {
  const paths = [];

  // when 'files' is a string => auto crawl that directory
  if (typeof files === "string")
    files = crawlForFiles(path.resolve(BASE_PATH, files));

  if (!files || !Array.isArray(files)) return paths;

  for (let i = 0; i < files.length; i++) {
    const item = {
      params: {
        slug: generateSlug(files[i]?.slug || files[i]),
      },
    };

    // add the `item` to the paths listing (handling desired draft states)
    if (
      drafts === true ||
      (files[i]?.draft !== false && files[i]?.meta?.draft !== false)
    )
      paths.push(item);
  }

  return {
    paths: paths,
    fallback: false,
  };
}

/**
 * Crawl a given directory to locate all of the files in in
 * @param {string} dirName String name of the directory to crawl
 * @param {boolean} autoParseFile
 * @param {boolean} drafts
 * @returns array of file paths, and when `autoParseFile` is true returns an array of file paths with their file parsed
 */
export function crawlForFiles(
  dirName = "",
  autoParseFile = true,
  drafts = false,
) {
  let files = [];

  // only resolve in the `BASE_PATH` directory
  if (!dirName?.startsWith(path.resolve(BASE_PATH)))
    dirName = path.resolve(path.join(BASE_PATH, dirName));

  try {
    // ensure the root `dirName` actually exists
    if (!fs.existsSync(dirName)) return false;

    // read in the desired directory
    let listing = fs.readdirSync(dirName, { withFileTypes: true });

    // crawl the search directory for more files
    for (let i = 0; i < listing.length; i++) {
      const pointer = path.join(dirName, listing[i]?.name);

      // recursively crawl child directories
      if (listing[i].isDirectory()) {
        files.push(...crawlForFiles(pointer, autoParseFile));
      } else if (listing[i].isFile()) {
        // TODO: add checking to only search for the given file extensions
        files.push(pointer);
      }
    }
  } catch (err) {
    console.log("[error] crawlForFiles:");
    console.warn(err);
  }

  // console.log("files: ", files);

  return files;
}
