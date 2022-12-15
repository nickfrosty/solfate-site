import { MenuIcon } from "@heroicons/react/solid";
import { useState } from "react";
import AppLogo from "./AppLogo";
import AppNav from "./AppNav";

import styles from "~/styles/nav.module.css";
// import Link from "next/link";

export default function AppHeader() {
  const [menu, setMenu] = useState(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <div className="inline-block flex-1 items-center mr-0 md:flex md:mr-2 md:justify-between md:space-x-8">
          <AppLogo className="pr-8" image={true} />

          <AppNav
            className={`hidden mx-auto w-full md:flex md:bg-transparent`}
          />

          {menu ? (
            <AppNav
              className={`md:hidden md:bg-transparent mx-auto w-full border-b shadow-lg border-gray-800 ${
                menu ? "fixed left-0 bg-black" : "hidden"
              }`}
            />
          ) : (
            <></>
          )}
        </div>

        <div className="flex justify-between items-center">
          <button
            className="icon-md md:hidden"
            onClick={(e) => {
              // alert("derp");
              setMenu(!menu);
            }}
          >
            <MenuIcon className="w-full" />
          </button>
        </div>

        <div className="hidden justify-between space-x-2 md:flex">
          {/* <Link href="/signin">
            <a className="btn-flex">Sign In</a>
          </Link> */}
          <button className="btn-flex btn-shadow">
            <span>Connect</span>
            <span className="hidden lg:inline-block">Wallet</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
