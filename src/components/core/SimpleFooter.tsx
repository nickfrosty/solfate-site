import Link from "next/link";
import styles from "@/styles/footer.module.css";
import { SITE } from "@/lib/constants";

export default function SimpleFooter() {
  return (
    <p className={styles.simple}>
      &copy; {new Date().getFullYear()}
      <Link href="/" className="ml-1 underline">
        {SITE.name}
      </Link>
      . All rights reserved.
    </p>
  );
}
