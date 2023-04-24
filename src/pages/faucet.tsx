/* eslint-disable @next/next/no-img-element */
import type { NextSeoProps } from "next-seo";
import Layout from "@/layouts/default";
import { useState } from "react";

import {
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
} from "@solana/web3.js";
import ErrorCard from "@/components/cards/ErrorCard";
import AirdropCard from "@/components/cards/AirdropCard";

// construct the meta data for the page
const metaData: NextSeoProps = {
  title: "Solana Faucet",
  description:
    "Turn on the Solana faucet to get an airdrop of free SOL deposited to your testnet or devnet wallet instantly.",
};

export default function Page() {
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<Array<any>>([]);

  /*
		Function to airdrop to the entered wallet address and selected cluster
	*/
  async function airdropSol(network: "devnet" | "testnet" | "mainnet") {
    setLoading(true);
    setError("");
    setTransactions([]);

    // init a blank signature
    let signature = "";

    let networkURL = () => {
      // process the accepted networks
      switch (network.toLowerCase()) {
        case "devnet":
          return clusterApiUrl("devnet");
        case "testnet":
          return clusterApiUrl("testnet");
        case "mainnet":
          alert("Ha, you wish!");
          return clusterApiUrl("devnet");
        default:
          return clusterApiUrl("devnet");
      }
    };

    try {
      // create a new cluster Connection
      const connection = new Connection(networkURL());

      // create an Public key from the string address
      const publicKey = new PublicKey(address.toString().trim());

      // if (!publicKey) throw Error("Request for airdrop failed");

      signature = await connection
        .requestAirdrop(publicKey, LAMPORTS_PER_SOL)
        .catch((err) => {
          console.log(err);
          throw Error("Request for airdrop failed");
        });

      await connection
        .confirmTransaction(signature, "confirmed")
        .catch((err) => {
          throw Error("Transaction failed to confirm");
        });

      const data = { network, address, signature };

      // update the state to notify the user of the confirmed
      setTransactions(() => {
        // clear the error
        setError("");
        // store the transaction
        return [data];
      });

      // setTransactions((prev) => {
      // 	prev.unshift(data);
      // 	console.log(prev);
      // 	return prev;
      // });

      console.log("Airdrop successful:", signature);
    } catch (err: any) {
      console.warn("error:", `Airdrop failed! ${err?.message}`, signature);
      setError(err?.message);
    }

    setLoading(false);
  }

  return (
    <Layout seo={metaData} className="container space-y-6">
      <main className="max-w-2xl col-span-2 mx-auto space-y-8 text-center md:py-14">
        <h1 className="justify-around space-x-5 text-4xl font-bold md:text-5xl flexer">
          <img
            src="/icons/shower.svg"
            alt="Solana Faucet"
            className="scale-x-flip icon-xl"
          />
          <span>Solana Faucet</span>
          <img
            src="/icons/shower.svg"
            alt="Solana Faucet"
            className="icon-xl"
          />
        </h1>

        <p className="mx-auto text-xl text-gray-700">
          Open the Solana faucet to get SOL deposited to your
          <br />
          <span className="text-highlight">testnet</span> or{" "}
          <span className="text-highlight">devnet</span> wallet instantly.
        </p>

        <div className="relative block">
          {loading && <div className="absolute right-3 bottom-3 loader"></div>}

          <input
            type="text"
            value={address}
            required={true}
            disabled={loading}
            placeholder="Enter a Solana wallet address"
            className={`input text-lg tracking-wide text-center ${
              loading ? "disabled" : ""
            }`}
            onChange={(e) => setAddress(e?.target?.value || "")}
          />
        </div>

        <p className="mx-auto text-xl text-gray-700">
          airdrop <span className="text-highlight">1 sol</span> on
        </p>

        <div className="grid justify-center grid-cols-2 gap-3 md:flex md:space-x-6">
          <button
            disabled={loading}
            className={`btn btn-lg btn-default ${loading ? "disabled" : ""}`}
            onClick={() => airdropSol("testnet")}
          >
            Testnet
          </button>

          <button
            disabled={loading}
            className={`row-start-1 col-span-2 btn btn-lg btn-indigo ${
              loading ? "disabled" : ""
            }`}
            onClick={() => airdropSol("devnet")}
          >
            Devnet
          </button>

          <button
            disabled={loading}
            className={`btn btn-lg btn-default ${loading ? "disabled" : ""}`}
            onClick={() => alert("Ha, you wish ;)")}
          >
            Mainnet?
          </button>
        </div>
      </main>

      <section className="max-w-2xl mx-auto space-y-3">
        {error && (
          <ErrorCard title="Solana Faucet Airdrop Failed" msg={error} />
        )}

        {transactions.map((tx, id) => (
          <AirdropCard tx={tx} key={id} />
        ))}
      </section>
    </Layout>
  );
}
