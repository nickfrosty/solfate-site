import { MenuIcon } from "@heroicons/react/solid";
import { useState } from "react";
import AppLogo from "./AppLogo";
import AppNav from "./AppNav";

// import { mapGetters, mapMutations } from "vuex";
// import Burger from "../utils/Burger";

// import Burger from "./misc/Burger.vue";
// import AppUserDropdown from "./AppUserDropdown.vue";

export default function AppHeader() {
	const [menu, setMenu] = useState(false);

	return (
		<nav id="app-nav" className="app-nav">
			<div className="nav-inner">
				<div className="md:flex md:mr-2 md:justify-between md:space-x-8 inline-block flex-1 items-center mr-0">
					<AppLogo className="pr-8" image={true} />
					{/* <AppLogo :burger="false" className="pr-8" :image="true" /> */}

					<AppNav
						className={`md:flex md:bg-transparent hidden mx-auto w-full`}
					/>

					{menu ? (
						<AppNav
							className={`md:hidden md:bg-transparent mx-auto w-full ${
								menu ? "fixed left-0 bg-black" : "hidden"
							}`}
						/>
					) : (
						<></>
					)}
				</div>

				<div className="flex justify-between items-center">
					{/* <nuxt-link
						to="/templates"
						className="btn btn-default md:inline-block hidden flex-shrink"
						>
						v-if="$auth.loggedIn"
						account area
					</nuxt-link> */}

					<button
						className="icon-md md:hidden"
						onClick={(e) => {
							// alert("derp");
							setMenu(!menu);
						}}
					>
						<MenuIcon className="w-full" />
					</button>

					{/* <AppUserDropdown
                        v-if="$auth.loggedIn"
                        className="md:ml-2 md:inline-block hidden"
                    /> */}
				</div>

				<div className="md:flex hidden justify-between space-x-2">
					{/* <Link href="/signin">
						<a className="btn">Sign In</a>
					</Link> */}
					{/* <button className="btn btn-indigo-outline whitespace-nowrap">
						<span className="">Connect</span>
						<span className="lg:inline-block hidden">Wallet</span>
					</button> */}
				</div>
			</div>
		</nav>
	);
}
