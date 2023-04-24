import Link from "next/link";
import styles from "@/styles/footer.module.css";

export default function FooterUtilitySection({
  className,
}: SimpleComponentProps) {
  return (
    <section className={className}>
      <h4 className={styles.title}>Solana Utilities</h4>

      <ul className={styles.list}>
        <li>
          <Link href="/faucet" className={styles.link}>
            Solana Faucet
          </Link>
        </li>
        <li>
          <Link href="/extension" className={styles.link}>
            Browser Extension
          </Link>
        </li>
      </ul>
    </section>
  );
}
