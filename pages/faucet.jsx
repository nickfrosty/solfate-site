/* eslint-disable @next/next/no-img-element */
import DefaultLayout from "~/layouts/default";
import { basicMeta } from "~/utils/seoMetaData";
import { DocumentDuplicateIcon } from "@heroicons/react/solid";
import { useState, useEffect } from "react";

import * as web3 from "@solana/web3.js";
import { ErrorCard } from "~/components/cards/ErrorCard";

// construct the meta data for the page
// const metaData = basicMeta({
const metaData = {
	title: "Solana Faucet",
	description:
		"Turn on the Solana faucet to get an airdrop of free SOL deposited to your testnet or devnet wallet instantly.",
};

export default function FaucetPage() {
	const depositAmount = 1; // airdrop only works with 1 sol?

	const [address, setAddress] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [transactions, setTransactions] = useState([]);

	// state used for the copy to clipboard section
	const [enabled, setEnabled] = useState(true);
	const [displayText, setDisplayText] = useState("");

	// useEffect(() => {
	// 	console.log(transactions);
	// }, [transactions]);

	/*
    Simple function to copy the `displayText` to the clipboard and show a UI change
  */
	const copyToClipboard = (text) => {
		if (enabled) {
			navigator.clipboard.writeText(displayText);
			let tmp = displayText;
			setDisplayText("Copied to clipboard!");
			setEnabled(false);
			setTimeout(() => {
				setDisplayText(tmp);
				setEnabled(true);
			}, 700);
		}
	};

	/*
		Function to airdrop to the entered wallet address and selected network
	*/
	async function airdropSol(network) {
		setLoading(true);
		setError("");
		setTransactions([]);

		// init a blank signature
		let signature = "";
		let networkURL = "";

		// process the accepted networks
		switch (network.toLowerCase()) {
			case "devnet":
				networkURL = "https://api.devnet.solana.com";
				break;
			case "testnet":
				networkURL = "https://api.testnet.solana.com";
				break;
			case "mainnet":
				alert("Ha, you wish!");
				return;
			default:
				alert("Unknown Solana network!");
				return;
		}

		try {
			// create a new connect
			const connection = new web3.Connection(networkURL);

			// create an Public key from the string address
			const publicKey = new web3.PublicKey(address);

			// if (!publicKey) throw Error("Request for airdrop failed");

			signature = await connection
				.requestAirdrop(
					publicKey,
					web3.LAMPORTS_PER_SOL * depositAmount
				)
				.catch((err) => {
					throw Error("Request for airdrop failed");
				});

			await connection
				.confirmTransaction(signature, "confirmed")
				.catch((err) => {
					throw Error("Transaction failed to confirm");
				});

			const data = { network, address, signature };

			// update the state to notify the user of the confirmed
			setTransactions([data]);
			setDisplayText(signature);

			// setTransactions((prev) => {
			// 	prev.unshift(data);
			// 	console.log(prev);
			// 	return prev;
			// });

			// console.log("Airdrop successful:", signature);
		} catch (err) {
			// notify({ type: 'error', message: `Airdrop failed!`, description: error?.message, txid: signature });
			console.warn(
				"error:",
				`Airdrop failed! ${err?.message}`,
				signature
			);
			setError(err?.message);
		}

		// alert("airdrop");
		setLoading(false);
	}

	return (
		<DefaultLayout seo={metaData} className="">
			{/* Page heading */}
			<main className="md:py-14 col-span-2 mx-auto space-y-8 max-w-2xl text-center">
				<h1 className="md:text-5xl text-3xl font-bold">
					🚿 Solana Faucet 🚿
				</h1>

				<p className="mx-auto text-xl text-gray-500">
					Open the Solana faucet to get SOL deposited to your
					<br />
					<span className="shadow-orange-sm text-white">
						testnet
					</span>{" "}
					or{" "}
					<span className="shadow-orange-sm text-white">devnet</span>{" "}
					wallet instantly.
				</p>

				<div className="block relative">
					{loading ? (
						<div className="loader absolute right-3 bottom-3"></div>
					) : (
						""
					)}
					<input
						type="text"
						required={true}
						disabled={loading}
						className={`input text-lg tracking-wide text-center ${
							loading ? "disabled" : ""}`}
						placeholder="Enter a Solana wallet address"
						value={address}
						onChange={(e) => {
							setAddress(e?.target?.value || "");
						}}
					/>
				</div>

				<p className="mx-auto text-xl text-gray-500">
					airdrop{" "}
					<span className="shadow-orange-sm font-bold text-white">
						1 sol
					</span>{" "}
					on
				</p>

				<div className="flex justify-center space-x-4">
					<button
						disabled={loading}
						className={`btn btn-lg btn-indigo-outline ${
							loading ? "disabled" : ""}`}
						onClick={() => airdropSol("testnet")}
					>
						Testnet
					</button>
					<button
						disabled={loading}
						className={`btn btn-lg btn-indigo ${
							loading ? "disabled" : ""}`}
						onClick={() => airdropSol("devnet")}
					>
						Devnet
					</button>
					<button
						disabled={loading}
						className={`btn btn-lg btn-indigo-outline ${
							loading ? "disabled" : ""}`}
						onClick={() => {
							alert("Ha, you wish :)");
						}}
					>
						Mainnet?
					</button>
				</div>
			</main>

			<section className="mx-auto space-y-3 max-w-2xl">
				{error ? (
					<ErrorCard
						title="Solana Faucet Airdrop Failed"
						msg={error}
					/>
				) : (
					<></>
				)}

				{transactions.map((tx) => {
					return (
						<div className="card p-6 space-y-2" key={tx.id}>
							<h4 className="heading">
								<span className="">Transaction confirmed</span>
								<span className="md:inline-block hidden">
									on{" "}
								</span>
								{/* <span>{depositAmount} SOL deposited</span> */}
								<span className="shadow-orange-sm md:inline-block hidden text-white">
									{tx.network}
								</span>
							</h4>
							<div
								className="flexer space-x-2 text-gray-500 cursor-pointer"
								onClick={copyToClipboard}
							>
								<p className="w-full truncate">{displayText}</p>
								<DocumentDuplicateIcon className="icon-md" />
							</div>
							<p className="space-x-3 text-sm text-gray-500">
								<a
									href={`https://explorer.solana.com/tx/${tx.signature}?cluster=${tx.network}`}
									className="link"
									target="_blank"
									rel="noreferrer"
								>
									Solana Explorer
								</a>
								<span>&#8226;</span>
								{/* <a href={``} className="link">
										Solscan
								</a> */}
								<a
									href={`https://solana.fm/tx/5p491a3wtWftBFyEprRsPHYRBqzoE1xkWiNQ6nx8q4h6KmWgVG9c9a3nehkM4NsbYY8CBT6dNzGK4KZcfadMT94m?cluster=${tx.network}-solana`}
									className="link"
									target="_blank"
									rel="noreferrer"
								>
									Solana.fm
								</a>
							</p>
						</div>
					);
				})}
			</section>
		</DefaultLayout>
	);
}