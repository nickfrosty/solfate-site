import React from "react";
import App from "next/app";
import { DefaultSeo } from "next-seo";
// import { ConnectionProvider } from "@solana/wallet-adapter-react";

import "~/styles/globals.css";
import dynamic from "next/dynamic";

// define the master endpoint for production
const endpoint = "https://ssc-dao.genesysgo.net";

// const WalletProvider = dynamic(
//   () => import("~/contexts/ClientWalletProvider.jsx"),
//   {
//     ssr: false,
//   },
// );

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      // <ConnectionProvider endpoint={endpoint}>
      //   <WalletProvider>
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
      //   </WalletProvider>
      // </ConnectionProvider>
    );
  }
}
