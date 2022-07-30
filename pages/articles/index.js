/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import DefaultLayout from "~/layouts/default";
import { basicMeta } from "~/utils/seoMetaData";
import { LargeCard } from "~/components/cards/LargeCard";
import { SmallCard } from "~/components/cards/SmallCard";

// import Image from "next/image";
// import WaitlistForm from "~/components/waitlist/WaitlistForm";

// construct the meta data for the page
// const metaData = basicMeta({
const metaData = {
	title: "Articles",
	description: "",
};

export default function HomePage() {
	return (
		<DefaultLayout seo={metaData}>
			{/* <p>page content here</p> */}

			<section className="double-wide-cards">
				{[
					{ id: 1, title: "Introduction to the Solana CLI" },
					{ id: 2, title: "Setup your development environment" },
				].map((item) => {
					return (
						<LargeCard
							key={item.id}
							title={item.title}
							href="/articles/example"
						>
							Description of the article here. Learn these really
							cool things here. Should likely cap it around 155ish
							characters.
						</LargeCard>
					);
				})}
			</section>

			<section className="card-listing">
				{[
					{ id: 1 },
					{ id: 2 },
					{ id: 3 },
					{ id: 4 },
					{ id: 5 },
					{ id: 6 },
					{ id: 7 },
					{ id: 8 },
				].map((item) => {
					return (
						<SmallCard
							key={item.id}
							title={`Article title #${item.id}`}
							href="/articles/example"
						>
							Description of the article here. Learn these really
							cool things here. Should likely cap it around 155ish
							characters.
						</SmallCard>
					);
				})}
			</section>
		</DefaultLayout>
	);
}
