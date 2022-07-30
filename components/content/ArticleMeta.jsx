/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { HashtagIcon } from "@heroicons/react/solid";

export function ArticleMeta({
	data = null,
	image = null,
	children = null,
	className = "",
}) {
	return (
		<section className={`${className} space-y-3`}>
			<p className="flexer space-x-2 tracking-wider text-gray-500">
				<span className="">Posted on July 12, 2022</span>
				{/* <span className="block w-1 h-1 bg-gray-500 rounded-full"></span>
						<a href="#" className="link">
							Nick Frostbutter
						</a> */}
			</p>

			{/* Post tags */}
			<p className="flexer">
				<span className="tag flexer w-min font-semibold">
					<HashtagIcon className="mx-auto w-4 h-4" /> rust
				</span>
				<span className="tag flexer w-min font-semibold">
					<HashtagIcon className="mx-auto w-4 h-4" /> solana
				</span>
				<span className="tag flexer w-min font-semibold">
					<HashtagIcon className="mx-auto w-4 h-4" /> web3js
				</span>
				<span className="tag flexer w-min font-semibold">
					<HashtagIcon className="mx-auto w-4 h-4" /> ipfs
				</span>
			</p>
		</section>
	);
}
