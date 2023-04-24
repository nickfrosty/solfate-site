/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "@/styles/nav.module.css";

type ComponentProps = SimpleComponentProps & {
  // icon;
  title?: string;
  href: string;
};

export default function NavLink({
  // icon,
  href,
  title = "",
  children,
}: ComponentProps) {
  const router = useRouter();
  const isCurrent = router.pathname?.startsWith(href) || false;

  return (
    <Link
      href={href}
      title={title}
      className={clsx(
        styles.link,
        isCurrent ? styles.activeLink : styles.inactiveLink,
      )}
    >
      {children}
    </Link>
  );
}
