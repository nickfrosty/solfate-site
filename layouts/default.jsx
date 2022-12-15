import { NextSeo } from "next-seo";
import AppFooter from "~/components/core/AppFooter";
import AppHeader from "~/components/core/AppHeader";

export default function Layout({ seo = {}, children, className = "" }) {
  return (
    <>
      <NextSeo {...seo} />

      <AppHeader />

      <main className={`min-h-screen ${className}`}>{children}</main>

      <AppFooter />
    </>
  );
}
