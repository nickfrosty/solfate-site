import React from "react";
import App from "next/app";
import { DefaultSeo } from "next-seo";

import "@/styles/globals.css";
import { SITE } from "@/lib/constants";

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <React.Fragment>
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
                url: `${SITE.url}/media/podcast/cover0-small.jpg`,
                width: 256,
                height: 256,
                alt: SITE.name,
              },
            ],
          }}
          twitter={{
            handle: "@SolfatePod",
            site: "@SolfatePod",
            cardType: "summary",
            // cardType: "summary_large_image",
          }}
        />

        <Component {...pageProps} />
      </React.Fragment>
    );
  }
}
