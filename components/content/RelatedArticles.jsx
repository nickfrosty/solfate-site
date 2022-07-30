/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { SmallCard } from "../cards/SmallCard";

export function RelatedArticles({
	data = null,
	image = null,
	children = null,
	className = "",
}) {
	return (
		<section className={`${className} card-listing lg:grid-cols-3 mt-8`}>
			<SmallCard
				title="Example related article"
				href="/articles/derp"
				description="This is the description for this article"
			/>
			<SmallCard
				title="Example related article"
				href="/articles/derp"
				description="Another 1 liner for this related article"
			/>
			<SmallCard
				title="Example related article"
				href="/articles/derp"
				description="This is the description for this article"
			/>
		</section>
	);
}
