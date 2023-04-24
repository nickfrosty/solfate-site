import Link from "next/link";
import styles from "~/styles/footer.module.css";

export default function FooterUtilitySection({
  className,
}: SimpleComponentProps) {
  return (
    <section className={className}>
      <h4 className={styles.title}>Solana Utilities</h4>

      <ul className={styles.list}>
        <li>
          <Link href="/faucet">
            <a className={styles.link}>Solana Faucet</a>
          </Link>
        </li>
        <li>
          <Link href="/extension">
            <a className={styles.link}>Browser Extension</a>
          </Link>
        </li>
        {/* <li>
          <Link href="/royalty">
            <a className={styles.link}>Royalty Checker</a>
          </Link>
        </li> */}
        {/* <li>
          <Link href="/fees">
            <a className={styles.link}>Fee Redeemer</a>
          </Link>
        </li> */}
      </ul>
    </section>
  );
}
