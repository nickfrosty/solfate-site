/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
// import Burger from "../utils/Burger";

export default function AppLogo({ className, image, burger, burgerSide }) {
	//
	if (burgerSide === "left") burgerSide = "flex-row-reverse";
	else burgerSide = "";

	// process the props for displaying the image
	if (image) image = <img className="icon" src="/icon.png" alt="Solfate" />;

	return (
		<div
			className={`flex flex-1 justify-between items-center space-x-3 w-full1 ${
				className || ""
			} ${burgerSide || ""}`}
		>
			{/* @click="$store.commit('closeSidebars')" */}
			{/* :className="burger && burgerSide != 'left' ? 'flex-row-reverse' : ''" */}
			{/* <Burger v-if="burger" :action="'setLeftSidebar'" /> */}

			{/* <Burger /> */}
			{/* {burger && <Burger />} */}

			<Link href="/">
				{/* @click="$store.commit('closeSidebars')" */}
				{/* click="alert('derp');" */}
				<a
					title="Home"
					className="flex justify-between items-center space-x-2"
				>
					{image || null}
					<span
						v-if="text"
						className="inline-block py-4 text-2xl font-bold tracking-wide"
					>
						Solfate
					</span>
				</a>
			</Link>
		</div>
	);
}
