import Link from "next/link";
import RssLinks from "~/components/podcast/RssLinks";
import styles from "~/styles/footer.module.css";

export default function FooterPodcastSection({ className }) {
  return (
    <section className={className}>
      <h4 className={styles.title}>Podcast</h4>

      <RssLinks className="my-3" />

      <ul className={styles.list}>
        <li>
          <Link href="/podcast">
            <a className={styles.link}>Browse Episodes</a>
          </Link>
        </li>
        {/* <li>
          <Link href="/podcast/idk">
            <a className={styles.link}>another link</a>
          </Link>
        </li> */}
      </ul>
    </section>
  );
}
