import Link from "next/link";
import styles from "~/styles/footer.module.css";

export default function FooterProductsSection({ className }) {
  return (
    <section className={className}>
      <h4 className={styles.title}>Products</h4>

      <ul className={styles.list}>
        <li>
          <Link href="/courses">
            <a className={styles.link}>Coming Soon</a>
          </Link>
        </li>
      </ul>
    </section>
  );
}
