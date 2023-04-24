import Link from "next/link";
import { Bars3Icon, MicrophoneIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import AppLogo from "./AppLogo";
import AppNav from "./AppNav";

import styles from "~/styles/nav.module.css";
import { XMarkIcon } from "@heroicons/react/24/outline";
// import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function AppHeader() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <div className={styles.linksListing}>
          <AppLogo className="pr-8" showImage={true} />

          <AppNav className={styles.desktopMenu} />

          {showMenu && (
            <AppNav
              className={`${styles.mobileMenu} ${
                showMenu ? styles.dropdownActive : styles.dropdownInactive
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

          <button className="icon-lg" onClick={(e) => setShowMenu(!showMenu)}>
            {showMenu ? (
              <XMarkIcon className="w-full" />
            ) : (
              <Bars3Icon className="w-full" />
            )}
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
