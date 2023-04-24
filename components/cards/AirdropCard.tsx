/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { DocumentDuplicateIcon } from "@heroicons/react/24/solid";
import styles from "~/styles/card.module.css";

type ComponentProps = {
  tx: any;
  title?: string;
  msg?: string;
};

export default function AirdropCard({
  tx,
  title = "An error occurred!",
  msg = "An unknown error occurred. Please try again.",
}: ComponentProps) {
  // state used for the `copyToClipboard` function
  const [enabled, setEnabled] = useState(true);
  const [displayText, setDisplayText] = useState(tx.signature);

  // Simple function to copy the `displayText` to the clipboard and show a UI change
  const copyToClipboard = () => {
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

  return (
    <div className={`${styles.shadow} ${styles.card} bg-white p-5 space-y-2`}>
      <h6 className="inline-flex space-x-1 text-lg heading">
        <span>Transaction confirmed</span>
        <span className="hidden md:inline">
          on <span className="text-indigo-600 shadow-orange">{tx.network}</span>
        </span>
      </h6>

      <div
        className="space-x-2 text-gray-700 cursor-pointer flexer"
        onClick={copyToClipboard}
      >
        <p className="w-full truncate">{displayText}</p>
        <DocumentDuplicateIcon className="icon-md" />
      </div>

      <p className="space-x-3 text-sm text-gray-700">
        <a
          href={`https://explorer.solana.com/tx/${tx.signature}?cluster=${tx.network}`}
          className="link"
          target="_blank"
          rel="noreferrer"
        >
          <span className="hidden md:inline">Solana</span> Explorer
        </a>
        <span>&#8226;</span>
        <a
          href={`https://solscan.io/tx/${tx.signature}?cluster=${tx.network}`}
          className="link"
        >
          Solscan
        </a>
        <span>&#8226;</span>
        <a
          href={`https://solana.fm/tx/${tx.signature}?cluster=${tx.network}-solana`}
          className="link"
          target="_blank"
          rel="noreferrer"
        >
          Solana.fm
        </a>
      </p>
    </div>
  );
}
