import React from "react";
import App from "next/app";
import { DefaultSeo } from "next-seo";

import "../styles/globals.css";

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <React.Fragment>
        <DefaultSeo
          title="Solfate"
          titleTemplate="Solfate - %s"
          defaultTitle="Solfate"
          openGraph={{
            type: "website",
            url: "https://solfate.com/",
            site_name: "Solfate",
            images: [
              {
                url: "https://solfate.com/icon.png",
                width: 256,
                height: 256,
                alt: "Solfate Labs",
              },
            ],
          }}
          twitter={{
            handle: "@SolfateLabs",
            site: "@SolfateLabs",
            cardType: "summary",
            // cardType: "summary_large_image",
          }}
        />

        <Component {...pageProps} />
      </React.Fragment>
    );
  }
}
