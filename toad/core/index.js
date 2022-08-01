// const fs = require("fs");
// const path = require("path");
// const matter = require("gray-matter");

import fs from "fs";
import path from "path";

import { DateTime } from "luxon";

//
import matter from "gray-matter";

/*
    Define base constants
*/
const BASE_PATH = "content";
// const BASE_PATH = path.join(process.cwd(), "content");

////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Retreive a markdown document from the `content` directory, parsed and ready to go
 * @param {string} slug slug of the file name to locate
 * @param {string} basePath (optional) folder path inside of the `content` folder to search for the given slug
 * @returns
 */
export async function getDocBySlug(slug, basePath = null) {
  try {
    // remove file extension from the slug
    slug = slug?.replace(/.md|.html|.html$/, "") || false;

    // locate the document based on its `slug`
    const filePath = getFilePath({ slug, basePath });
    if (!filePath) return false;

    // load the doc and return it as requested
    const doc = await loadAndParseFile(filePath);
    if (!doc) return false;
    return doc;
  } catch (err) {
    console.warn("Unable to locate document:", slug);
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
  if (options?.basePath)
    options.basePath = path.join(BASE_PATH, options.basePath);
  else options.basePath = path.join(BASE_PATH);

  // check for file based routing (fastest)
  if (
    options?.slug &&
    fs.existsSync(path.join(options.basePath, `${options?.slug}.md`))
  )
    return path.join(options.basePath, `${options?.slug}.md`);

  // when not found in file based routing, begin crawling...
  const files = crawlForFiles(options.basePath, true);

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
 * @param {string} filePath
 * @returns
 */
export async function loadAndParseFile(filePath) {
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
      content: file?.content,
      slug: null,
    };

    console.log("dates");
    console.log(data?.meta?.updatedAt, new Date(data?.meta?.updatedAt));

    // enable the user to override the `updatedAt` date from the front matter
    data.meta.createdAt = DateTime.fromJSDate(stats.birthtime).toString();

    if (data?.meta?.updatedAt) {
      let tmp = new Date(data?.meta?.updatedAt);

      if (tmp instanceof Date && !isNaN(tmp).valueOf()) {
        console.log("valid and parse");
        data.updatedAt = DateTime.fromISO(tmp.toISOString()).toString();
      }
      // else invalid date and keep it as the updated loaded from the file
    }

    if (!data?.meta?.updatedAt)
      (data.meta.updatedAt = DateTime.fromJSDate(stats.mtime).toString()),
        console.log(data);

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

  /* 
    Order of precedence for slug generation:
      1. item as a string (aka the string path)
      2. item.path
      // 3. item.meta.slug
  */

  if (typeof item === "string" || item?.path) {
    let slug = typeof item === "string" ? item : item?.path || "";
    slug = slug.split(path.sep);
    slug = slug[slug.length - 1];

    // NOTE: this may result in unexpected issues if the file name has multiple extensions (e.g ".env.bak")
    // but this should not be a problem for simple text files (like .md) or most image formats

    return slug?.replace(/.md|.html|.html$/, "") || slug;
    return slug;
  } else {
    // console.log("-----------------");
    // console.log("item ::: ", item);
    // console.log("item.path ::: ", item.path);

    return "";
  }
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
  dirName = BASE_PATH,
  autoParseFile = true,
  drafts = false,
) {
  let files = [];

  let listing = fs.readdirSync(path.join(dirName), { withFileTypes: true });

  // crawl the search directory for more files
  for (let i = 0; i < listing.length; i++) {
    const pointer = path.join(dirName, listing[i]?.name);

    // recursively crawl child directories
    if (listing[i].isDirectory())
      files.push(...crawlForFiles(pointer, autoParseFile));
    else if (listing[i].isFile()) {
      // TODO: add checking to only search for the given file extensions

      // when desired, ready and parse the files contents
      // if (autoParseFile) {
      // 	const item = parseFile(pointer);

      // 	// add the files parsed 'item' to the array (but NOT drafts unless explictly wanted)
      // 	if (drafts === true || item?.meta?.draft !== false)
      // 		files.push(item);
      // } else
      files.push(pointer);
    }
  }

  // console.log("files: ", files);

  return files;
}
