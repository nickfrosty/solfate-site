import Link from "next/link";
import RssLinks from "@/components/podcast/RssLinks";
import styles from "@/styles/footer.module.css";

export default function FooterPodcastSection({
  className,
}: SimpleComponentProps) {
  return (
    <section className={className}>
      <h4 className={styles.title}>Podcast</h4>

      <RssLinks className="my-3" />

      <ul className={styles.list}>
        <li>
          <Link href="/podcast" className={styles.link}>
            Browse Episodes
          </Link>
        </li>
        {/* <li>
          <Link href="/podcast/idk" className={styles.link}>
            another link
          </Link>
        </li> */}
      </ul>
    </section>
  );
}
