/* eslint-disable @next/next/no-img-element */
import CourseLayout from "~/layouts/CourseLayout";
// import Image from "next/image";
import { basicMeta } from "~/utils/seoMetaData";
import {
	ChevronDoubleRightIcon,
	ShareIcon,
	LinkIcon,
} from "@heroicons/react/solid";

// import WaitlistForm from "~/components/waitlist/WaitlistForm";

// construct the meta data for the page
// const metaData = basicMeta({
const metaData = {
	title: "Articles",
	description: "",
};

export default function HomePage() {
	return (
		<CourseLayout seo={metaData}>
			{/* Minor nav area */}
			<section className="flexer justify-between items-center mb-8 space-y-0 w-full">
				{/* Bread crumbs area */}
				<section className="flex justify-start items-center space-x-2 text-base font-bold tracking-wide">
					<span href="" className="text-gray-500">
						Articles
					</span>
					<ChevronDoubleRightIcon className="w-3 h-3" />
					<span href="" className="">
						This is the article title here
					</span>
				</section>

				<section className="flex justify-center space-x-3">
					<button className="hover:text-white text-gray-500">
						<ShareIcon className="icon-base mx-auto" />
					</button>
					<button className="hover:text-white text-gray-500">
						<LinkIcon className="icon-base mx-auto" />
					</button>
				</section>
			</section>

			{/* Primary content area */}
			<main className="">
				<h1 className="text-5xl font-bold">Article title here</h1>
				<p className="text-gray-500">
					Description of the article here. Learn these really cool
					things here. Should likely cap it around 155ish characters.
				</p>
			</main>
		</CourseLayout>
	);
}
