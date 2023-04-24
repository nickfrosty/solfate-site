import Link from "next/link";
import styles from "~/styles/footer.module.css";

export default function FooterResourcesSection({
  className,
}: SimpleComponentProps) {
  return (
    <section className={className}>
      <h4 className={styles.title}>Resources</h4>

      <ul className={styles.list}>
        <li>
          <Link href="/about">
            <a className={styles.link}>About Solfate</a>
          </Link>
        </li>
        {/* <li>
					<Link href="/legal/terms">
						<a className={styles.link}>Terms &amp; Conditions</a>
					</Link>
				</li> */}
        <li>
          <Link href="/legal/privacy">
            <a className={styles.link}>Privacy Policy</a>
          </Link>
        </li>
        <li>
          <Link href="https://twitter.com/SolfatePod">
            <a className={styles.link} target="_blank">
              Contact Us
            </a>
          </Link>
        </li>
      </ul>
    </section>
  );
}
