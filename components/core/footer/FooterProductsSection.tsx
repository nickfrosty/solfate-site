import Link from "next/link";
import styles from "~/styles/footer.module.css";

export default function FooterProductsSection({
  className,
}: SimpleComponentProps) {
  return (
    <section className={className}>
      <h4 className={styles.title}>Products</h4>

      <ul className={styles.list}>
        <li>
          <Link href="/cli">
            <a className={styles.link}>Solfate CLI</a>
          </Link>
        </li>
        <li>
          <Link href="/extension">
            <a className={styles.link}>Browser Extension</a>
          </Link>
        </li>
        {/* <li>
          <Link href="/products/dnl.link">
            <a className={styles.link}>dnl.link</a>
          </Link>
        </li> */}
      </ul>
    </section>
  );
}
