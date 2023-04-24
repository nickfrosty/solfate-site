import Link from "next/link";
import styles from "@/styles/footer.module.css";

export default function FooterResourcesSection({
  className,
}: SimpleComponentProps) {
  return (
    <section className={className}>
      <h4 className={styles.title}>Resources</h4>

      <ul className={styles.list}>
        <li>
          <Link href="/about" className={styles.link}>
            About Solfate
          </Link>
        </li>
        {/* <li>
          <Link href="/legal/terms" className={styles.link}>
            Terms &amp; Conditions
          </Link>
        </li> */}
        {/* <li>
          <Link href="/legal/privacy" className={styles.link}>
            Privacy Policy
          </Link>
        </li> */}
        <li>
          <Link
            href="https://twitter.com/SolfatePod"
            className={styles.link}
            target="_blank"
          >
            Contact Us
          </Link>
        </li>
      </ul>
    </section>
  );
}
