import Link from "next/link";
import styles from "@/styles/footer.module.css";

export default function SimpleFooter() {
  return (
    <p className={styles.simple}>
      &copy; {new Date().getFullYear()}
      <Link href="/" className="ml-1 underline">
        Solfate Podcast
      </Link>
      . All rights reserved.
    </p>
  );
}
