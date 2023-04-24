import Link from "next/link";
import { Bars3Icon, MicrophoneIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import AppLogo from "./AppLogo";
import AppNav from "./AppNav";

import styles from "~/styles/nav.module.css";
// import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function AppHeader() {
  const [menu, setMenu] = useState(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <div className={styles.linksListing}>
          <AppLogo className="pr-8" image={true} />

          <AppNav className={styles.desktopMenu} />

          {menu && (
            <AppNav
              className={`${styles.mobileMenu} ${
                menu ? styles.dropdownActive : styles.dropdownInactive
              }`}
            />
          )}
        </div>

        <div className={styles.mobileActionMenu}>
          <Link href="/podcast">
            <a className="icon-md">
              <MicrophoneIcon className="w-full" />
            </a>
          </Link>

          <button className="icon-lg" onClick={(e) => setMenu(!menu)}>
            <Bars3Icon className="w-full" />
          </button>
        </div>

        {/* <div className={styles.desktopActionMenu}>
          <Link href={`/podcast`}>
            <a className="block w-min btn-flex">
              <span>Podcast</span>
              <ArrowRightIcon className="icon-sm" />
            </a>
          </Link>
        </div> */}

        {/* <div className={styles.desktopActionMenu}>
        </div> */}
      </div>
    </nav>
  );
}
