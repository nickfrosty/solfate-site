// const fs = require("fs");
// const path = require("path");
// const matter = require("gray-matter");

import fs from "fs";
import path from "path";

//
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

/*
    Define base constants
*/
const basePath = "content";
// const basePath = path.join(process.cwd(), "content");

////////////////////////////////////////////////////////////////////////////////////////////

export async function getDocBySlug(slug, parseMarkdown = true) {
	try {
		// init some vars

		// remove file extension from the slug
		slug = slug?.replace(/.md|.html|.html$/, "");

		const filePath = getFilePath({ slug });

		if (!filePath) return false;

		const doc = await loadAndParseFile(filePath);

		if (!doc) return false;

		if (parseMarkdown)
			doc.content = await markdownToHtml(doc?.content || "");

		return doc;
	} catch (err) {
		console.warn("Unable to locate document:", slug);
		console.warn(err);
	}
	return false;
	// then parse crawl for the slug
}

export default async function markdownToHtml(markdown) {
	const result = await remark().use(html).process(markdown);
	return result.toString();
}

export function getFilePath(options) {
	// options structure
	// const struct = {
	// 	// either a path or a slug is required, but not both. Path will superceed the slug, since it is faster
	// 	path: "",
	// 	slug: "",
	// };

	// check for file based routing (fastest)
	if (
		options?.slug &&
		fs.existsSync(path.join(basePath, `${options?.slug}.md`))
	)
		return path.join(basePath, `${slug}.md`);

	// when not found in file based routing, begin crawling...
	const files = crawlForFiles(undefined, true);
	// console.log(files);

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
		let file = await fs.readFileSync(path.join(filePath), "utf-8");
		file = matter(file);

		// extract the desired attributes and values
		// construct the parsed 'data' to return
		const data = {
			path: filePath,
			meta: file?.data || null,
			content: file?.content,
			slug: null,
		};

		data.slug = generateSlug(data);

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

	/* Order of precedence for slug generation:
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
 * Generate a valid NextJS `getStaticPaths` object
 * @param {array|string} files name of the directory to crawl, or an array listing of an already crawled directory
 * @param {boolean} drafts whether or not to include items that are marked as `draft: true` in their front-matter
 * @returns a valid NextJS `getStaticPaths` object
 */
export function generateStaticPaths(files = null, drafts = false) {
	const paths = [];

	// when 'files' is a string => auto crawl that directory
	if (typeof files === "string") files = crawlForFiles(files);

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

	return paths;
}

/**
 * Crawl a given directory to locate all of the files in in
 * @param {string} dirName String name of the directory to crawl
 * @param {boolean} autoParseFile
 * @param {boolean} drafts
 * @returns array of file paths, and when `autoParseFile` is true returns an array of file paths with their file parsed
 */
export function crawlForFiles(
	dirName = basePath,
	autoParseFile = true,
	drafts = false
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
