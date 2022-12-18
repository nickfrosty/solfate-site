import { Bars3Icon } from "@heroicons/react/24/solid";
import { useState } from "react";
import AppLogo from "./AppLogo";
import AppNav from "./AppNav";

import { SelectAndConnectWalletButton } from "~/components/SelectAndConnectButton";
import styles from "~/styles/nav.module.css";

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
            <Bars3Icon className="w-full" />
          </button>
        </div>

        <div className={styles.desktopActionMenu}>
          <SelectAndConnectWalletButton />
        </div>
      </div>
    </nav>
  );
}
