/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "~/styles/nav.module.css";

export default function NavLink({ icon, href, title = "", children }) {
  const router = useRouter();
  const isCurrent = router.pathname?.startsWith(href) || false;

  if (!href) return;

  return (
    <Link href={href}>
      <a
        title={title}
        className={clsx(
          styles.link,
          isCurrent ? styles.activeLink : styles.inactiveLink,
        )}
      >
        {children}
      </a>
    </Link>
  );
}
