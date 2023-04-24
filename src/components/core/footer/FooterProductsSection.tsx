import Link from "next/link";
import styles from "@/styles/footer.module.css";

export default function FooterProductsSection({
  className,
}: SimpleComponentProps) {
  return (
    <section className={className}>
      <h4 className={styles.title}>Products</h4>

      <ul className={styles.list}>
        <li>
          <Link href="/cli" className={styles.link}>
            Solfate CLI
          </Link>
        </li>
        <li>
          <Link href="/extension" className={styles.link}>
            Browser Extension
          </Link>
        </li>
        {/* <li>
          <Link href="/products/dnl.link" className={styles.link}>
            dnl.link
          </Link>
        </li> */}
      </ul>
    </section>
  );
}
