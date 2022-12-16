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
          <button className="icon-lg" onClick={(e) => setMenu(!menu)}>
            <MenuIcon className="w-full" />
          </button>
        </div>

        <div className={styles.desktopActionMenu}>
          <button
            className="btn-flex btn-shadow"
            onClick={() => alert("Soon™")}
          >
            <span>Connect</span>
            <span className="hidden lg:inline-block">Wallet</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
