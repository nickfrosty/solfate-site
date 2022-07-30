/* eslint-disable @next/next/no-img-element */

import { generateStaticPaths, getDocBySlug } from "../../toad/core/index";

import ArticleSidebar from "~/layouts/ArticleSidebar";
// import Image from "next/image";
// import { basicMeta } from "~/utils/seoMetaData";
// import { AuthorCard } from "~/components/articles/AuthorCard";
import { RelatedArticles } from "~/components/content/RelatedArticles";
import { ArticleMeta } from "~/components/content/ArticleMeta";
import { Breadcrumbs } from "~/components/content/Breadcrumbs";

// import WaitlistForm from "~/components/waitlist/WaitlistForm";

// construct the meta data for the page
// const metaData = basicMeta({
const metaData = {
	title: "Articles",
	description: "",
};

export async function getStaticPaths() {
	// get the listing of all of the markdown files
	const basePath = "content";

	// let files = await crawlForFiles(basePath);
	const paths = generateStaticPaths(basePath, false);

	// add the temp placeholder item
	// console.log(paths);

	return {
		paths: paths,
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	console.log("Static props:");
	console.log(params);

	const post = await getDocBySlug(params?.slug);

	console.log("----- file data found ---- ");
	console.log(post);

	// give the 404 page when the post is not found
	if (!post) return { notFound: true };

	return {
		props: { ...post },
	};
}

/*

*/
export default function SingleArticlePage({ meta, content, mdx, seo }) {
	return (
		<ArticleSidebar seo={metaData} className="space-y-10">
			{/* Bread crumbs area */}
			<Breadcrumbs />

			{/* Primary content area */}
			<main className="space-y-5">
				<h1 className="heading heading-xl">{meta?.title}</h1>

				<ArticleMeta />

				<article
					className="py-10 text-gray-500"
					dangerouslySetInnerHTML={{ __html: content }}
				></article>

				{mdx}

				{/* <AuthorCard /> */}
			</main>

			{/* <RelatedArticles /> */}
		</ArticleSidebar>
	);
}
