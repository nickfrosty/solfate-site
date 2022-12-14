import { HeartIcon } from "@heroicons/react/solid";
import Link from "next/link";
import FooterProductsSection from "./footer/FooterProductsSection";
import FooterResourcesSection from "./footer/FooterResourcesSection";
import FooterUtilitySection from "./footer/FooterUtilitySection";

import styles from "~/styles/footer.module.css";
import { NICK, TWITTER } from "~/constants";

export default function AppFooter() {
  // define the sizes of the two section of the footer
  const trademarkSize = "md:w-1/2";
  const linkSectionSize = "md:w-1/2";

  // const trademarkSize = "md:w-2/5";
  // const linkSectionSize = "md:w-3/5";

  return (
    <footer className={styles.footer}>
      <section className={`container ${styles.inner}`}>
        <div className={`mb-4 space-y-4 w-full text-white ${trademarkSize}`}>
          <div className="flex justify-between items-center">
            <Link href="/">
              <a className="inline-block py-2 text-3xl font-bold">Solfate</a>
            </Link>
            <div className="block md:hidden">
              <a
                href={TWITTER.url}
                className="px-4 btn btn-sm btn-twitter btn-shadow"
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
              className="px-4 btn btn-twitter btn-shadow"
              target="_blank"
              rel="noreferrer"
            >
              {TWITTER.handle}
            </a>
          </div>
        </div>

        <div className={`w-full ${linkSectionSize}`}>
          <div className="flex flex-wrap mb-6 items-top">
            {/* <FooterProductsSection columns={3} /> */}

            <FooterUtilitySection
              className={styles["two-column"]}
              columns={2}
            />

            {/* <FooterResourcesSection columns={3} /> */}
          </div>
        </div>
      </section>

      <section className={`${styles.inner} container items-center`}>
        <section className="space-y-1">
          <p>
            Copyright &copy; {new Date().getFullYear()}
            {` `}
            Solfate Labs
          </p>

          <p className="block mt-0 mb-2 space-x-2 text-sm flexer">
            <HeartIcon className="text-red-500 icon-sm" />
            <span>
              by{" "}
              <a
                href={NICK.website}
                className={styles.link}
                target="_blank"
                rel="noreferrer"
              >
                {NICK.name}
              </a>
            </span>
          </p>
        </section>

        <ul className={styles["simple-links"]}>
          <li>
            <Link href="/legal/privacy">Privacy Policy</Link>
          </li>
          <li>
            <Link href="/legal/terms">Terms of Use</Link>
          </li>
        </ul>
      </section>
    </footer>
  );
}
