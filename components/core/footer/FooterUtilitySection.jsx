import Link from "next/link";
import styles from "~/styles/footer.module.css";

export default function FooterUtilitySection({ className }) {
  return (
    <section className={className}>
      <h4 className={styles.title}>Utilities</h4>

      <ul className={styles.list}>
        <li>
          <Link href="/faucet">
            <a className={styles.link}>Solana Faucet</a>
          </Link>
        </li>
        <li>
          <Link href="/extension">
            <a className={styles.link}>Extension</a>
          </Link>
        </li>
        <li>
          <Link href="/cli">
            <a className={styles.link}>CLI</a>
          </Link>
        </li>
      </ul>
    </section>
  );
}
