import { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { shortAddress } from "~/utils/solana";

export const SelectAndConnectWalletButton = ({ onUseWalletClick }) => {
  const { setVisible } = useWalletModal();
  const { wallet, connect, disconnect, connecting, publicKey } = useWallet();

  useEffect(() => {
    if (!publicKey && wallet) {
      try {
        // connect();
      } catch (err) {
        console.log("Error connecting to the wallet: ", err.message);
      }
    }
  }, [wallet]);

  const handleWalletClick = () => {
    try {
      if (!wallet) setVisible(true);
      else connect();

      if (typeof onUseWalletClick === "function") onUseWalletClick();
    } catch (err) {
      console.log("Error connecting to the wallet: ", err.message);
    }
  };

  if (publicKey)
    return (
      <button className="btn" onClick={disconnect} disabled={connecting}>
        {shortAddress(publicKey.toBase58())}
      </button>
    );
  else
    return (
      <button
        className="btn-flex"
        onClick={handleWalletClick}
        disabled={connecting}
      >
        <span>Connect</span>
        <span className="hidden lg:inline-block">Wallet</span>
      </button>
    );
};
