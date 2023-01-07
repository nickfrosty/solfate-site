import Link from "next/link";
import { HeartIcon } from "@heroicons/react/24/solid";
// import FooterResourcesSection from "./footer/FooterResourcesSection";
import FooterProductsSection from "~/components/core/footer/FooterProductsSection";
import FooterUtilitySection from "~/components/core/footer/FooterUtilitySection";

import styles from "~/styles/footer.module.css";
import { NICK, TWITTER } from "~/lib/constants";

export default function AppFooter() {
  return (
    <footer className={styles.footer}>
      <section className={`container ${styles.inner} ${styles["two-column"]}`}>
        <div className={`mb-4 space-y-4 w-full text-white`}>
          <div className="flex justify-between items-center">
            <Link href="/">
              <a className="inline-block py-2 text-3xl font-bold">Solfate</a>
            </Link>
            <div className="block md:hidden">
              <a
                href={TWITTER.url}
                className="px-4 btn btn-sm btn-twitter"
                target="_blank"
                rel="noreferrer"
              >
                {TWITTER.handle}
              </a>
            </div>
          </div>

          <p className="block mt-0 text-lg">
            A public experiment of building into the Solana blockchain
            ecosystem. Solfate is primarily focused on building useful tools and
            utilities for the masses.
          </p>

          <div className="hidden md:inline-block">
            <a
              href={TWITTER.url}
              className="px-4 btn btn-twitter"
              target="_blank"
              rel="noreferrer"
            >
              {TWITTER.handle}
            </a>
          </div>
        </div>

        <nav className={`pt-8 ${styles["two-column"]}`}>
          <FooterUtilitySection />

          <FooterProductsSection />

          {/* <FooterResourcesSection className={styles["two-column"]} /> */}
        </nav>
      </section>

      <section className={`container ${styles.footing}`}>
        <section className={styles.copyright}>
          <p>
            Copyright &copy; {new Date().getFullYear()}
            {` `}
            Solfate Labs
          </p>

          <p className="inline-flex mt-0 mb-2 space-x-1 text-sm">
            <HeartIcon className="text-red-400 icon-sm" />
            <span>by</span>
            <a
              href={NICK.website}
              // className={styles.link}
              className={"text-black underline"}
              target="_blank"
              rel="noreferrer"
            >
              {NICK.name}
            </a>
          </p>
        </section>

        {/* <ul className={styles["simple-links"]}>
          <li>
            <Link href="/legal/privacy">Privacy Policy</Link>
          </li>
          <li>
            <Link href="/legal/terms">Terms of Use</Link>
          </li>
        </ul> */}
      </section>
    </footer>
  );
}
