import { NextSeo } from "next-seo";
import AppFooter from "~/components/core/AppFooter";
import AppHeader from "~/components/core/AppHeader";
import { SmallCard } from "~/components/cards/SmallCard";
import {
	HeartIcon,
	ThumbUpIcon,
	ShareIcon,
	DuplicateIcon,
	ChatAlt2Icon,
} from "@heroicons/react/outline";

export default function Layout({
	seo = null,
	children = null,
	className = "",
}) {
	return (
		<>
			<NextSeo {...seo} />

			<AppHeader />

			<section className="md:max-w-6xl container grid grid-cols-12 w-full">
				<main
					className={`col-span-9 space-y-3 flex-grow min-h-screen ${
						className ? className : ""
					}`}
				>
					{children}
				</main>

				<aside className="top-34 sticky col-span-3 place-self-start space-y-10 w-full">
					{/* Reaction buttons */}
					<section className="grid grid-cols-2 gap-6 w-full">
						<button className="hover-outline items-center px-4 py-7 space-y-3 text-center bg-gray-700 rounded-2xl">
							<div className="icon-base mx-auto text-white">
								<ThumbUpIcon className="mx-auto" />
							</div>
							<p className="text-xl font-bold">
								{"32"}
								{/* {Math.floor(Math.random() * 100)} */}
							</p>
							<p className="font-semibold uppercase">Like</p>
						</button>
						<button className="hover-outline items-center px-4 py-7 space-y-3 text-center bg-gray-700 rounded-2xl">
							<div className="icon-base mx-auto text-white">
								<ChatAlt2Icon className="mx-auto" />
								{/* <HeartIcon className="mx-auto" /> */}
							</div>
							<p className="text-xl font-bold">
								{"7"}
								{/* {Math.floor(Math.random() * 100)} */}
							</p>
							<p className="font-semibold uppercase">Discuss</p>
							{/* <p className="uppercase">Love</p> */}
						</button>
					</section>

					{/* Share buttons */}
					<section className="flex justify-center space-x-4 w-full">
						<button className="hover:text-white text-gray-500">
							<ShareIcon className="icon-base mx-auto" />
						</button>
						<button className="hover:text-white text-gray-500">
							<DuplicateIcon className="icon-base mx-auto" />
						</button>
					</section>

					{/* Related article */}
					{/* <section className="">
						<h3 className="mb-4 text-base font-bold text-center uppercase">
							Related Article
						</h3>

						<SmallCard
							title="Example related article"
							href="/articles/derp"
						/>
					</section> */}
				</aside>
			</section>

			<AppFooter />
		</>
	);
}
