import React from "react";
import type { AppProps } from "next/app";

import { DefaultSeo } from "next-seo";

import "@/styles/globals.css";
import { SITE } from "@/lib/constants";

import { Inter } from "next/font/google";

const font = Inter({
  subsets: ["latin"],
  variable: "--font-theme",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <style jsx global>
        {`
          :root {
            --font-theme: ${font.style.fontFamily};
          }
        `}
      </style>

      <DefaultSeo
        title={SITE.name}
        titleTemplate={`${SITE.name} - %s`}
        defaultTitle={SITE.name}
        openGraph={{
          type: "website",
          url: SITE.url,
          site_name: SITE.name,
          images: [
            {
              url: `${SITE.url}/social.png`,
              width: 256,
              height: 256,
              alt: SITE.name,
            },
          ],
        }}
        twitter={{
          handle: "@SolfatePod",
          site: "@SolfatePod",
          cardType: "summary_large_image",
        }}
      />

      <Component {...pageProps} />
    </React.Fragment>
  );
}
