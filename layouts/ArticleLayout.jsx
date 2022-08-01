import { NextSeo } from "next-seo";
import AppFooter from "~/components/core/AppFooter";
import AppHeader from "~/components/core/AppHeader";
import ArticleSidebar from "~/components/sidebars/ArticleSidebar";

const SHOW_SIDEBAR = false;

export default function Layout({
  seo = null,
  children = null,
  className = "",
}) {
  return (
    <>
      <NextSeo {...seo} />

      <AppHeader />

      <section
        className={`container mx-auto w-full ${
          SHOW_SIDEBAR ? "md:max-w-6xl grid grid-cols-12" : "md:max-w-4xl"
        }`}
      >
        <main
          className={`col-span-9 space-y-3 flex-grow min-h-screen ${
            className ? className : ""}`}
        >
          {children}
        </main>

        {SHOW_SIDEBAR ? <ArticleSidebar /> : ""}
      </section>

      <AppFooter />
    </>
  );
}
