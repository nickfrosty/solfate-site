import { NextSeo, type NextSeoProps } from "next-seo";
import AppFooter from "@/components/core/AppFooter";
import AppHeader from "@/components/core/AppHeader";

type LayoutProps = SimpleComponentProps & {
  seo?: NextSeoProps;
};

export default function Layout({
  seo = {},
  children,
  className = "",
}: LayoutProps) {
  return (
    <>
      <NextSeo {...seo} />

      <AppHeader />

      <main className={`min-h-screen ${className}`}>{children}</main>

      <AppFooter />
    </>
  );
}
