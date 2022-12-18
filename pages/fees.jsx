/* eslint-disable @next/next/no-img-element */
import Layout from "~/layouts/default";
import styles from "~/styles/card.module.css";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import {
  PublicKey,
  Connection,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { Metaplex } from "@metaplex-foundation/js";
import { TokenListProvider } from "@solana/spl-token-registry";
import { explorerLink, shortAddress } from "~/utils/solana";

// construct the meta data for the page
const metaData = {
  title: "Solana Fee Redeemer",
  description:
    "Reclaim your Solana wallet's rent and storage fees directly from the blockchain. It's basically free money...that was always yours.",
};

export default function Page() {
  const [walletAddress, setWalletAddress] = useState(
    "GQuioVe2yA6KZfstgmirAvugfUZBcdxSi7sHK7JGk3gk",
  );

  const [loading, setLoading] = useState(false);
  const [tokenList, setTokenList] = useState([]);
  const [accounts, setAccounts] = useState([]);

  // compute and memo-ize the stats for the stats cards
  // const stats = useMemo(() => {
  //   let instant = 0;

  //   if (accounts?.length > 0)
  //     instant =
  //       accounts.reduce(
  //         (accumulator, item) =>
  //           accumulator + item.account.data.parsed.info.tokenAmount.uiAmount,
  //       ) || 0;

  //   const tokenCount =
  //     accounts.filter(
  //       (item) => item.account.data.parsed.info.tokenAmount.decimals != 0,
  //     ).length || 0;

  //   return {
  //     instant,
  //     nftCount: 12,
  //     tokenCount,
  //   };
  // }, [accounts]);

  const filteredAccounts = useMemo(() => {
    return accounts
      .filter((item) => item.account.data.parsed.info.tokenAmount.decimals != 0)
      .sort((a, b) => {
        return (
          a.account.data.parsed.info.tokenAmount.uiAmount -
          b.account.data.parsed.info.tokenAmount.uiAmount
        );
      });
  }, [accounts]);

  const emptyAccounts = useMemo(
    () =>
      // .sort((a, b) => {
      //   return (
      //     a.account.data.parsed.info.tokenAmount.uiAmount -
      //     b.account.data.parsed.info.tokenAmount.uiAmount
      //   );
      // }),
      accounts.filter(
        (item) => item.account.data.parsed.info.tokenAmount.uiAmount == 0,
      )[accounts],
  );

  // track the various types of accounts (e.g. "Known Tokens", "NFTs", "Unknown Tokens", "Other")

  // useEffect(() => {
  //   console.log("accounts changed");
  // }, [accounts]);

  // useEffect(() => {
  //   console.log("tokenList changed");
  //   // console.log(tokenList);
  // }, [tokenList]);

  // const url = clusterApiUrl("mainnet-beta");
  const url =
    "https://solana-mainnet.g.alchemy.com/v2/Xbr3b6ZtnK87u_Dn88QUQGj0dm_gjVt_";
  const conn = new Connection(url);

  const programId = new PublicKey(
    "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
  );
  // TODO: add support for token22 program

  /******************************************************************************************/

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const wallet = new PublicKey(walletAddress);

      // fetch the SPL token list
      // NOTE: Technically this package is deprecated...sooo....
      new TokenListProvider().resolve().then((tokens) => {
        // console.log("Token list obtained!");
        setTokenList(tokens.filterByClusterSlug("mainnet-beta").getList());

        // const tokenList =
        // console.log(tokenList);
      });

      // construct a reference to the Metaplex library
      const metaplex = Metaplex.make(conn);

      // get the listing of token accounts for the `owner`
      const tokenAccounts = await conn.getParsedTokenAccountsByOwner(wallet, {
        programId,
      });
      console.log(tokenAccounts?.value?.length, "token accounts found!");

      const mints = tokenAccounts.value
        .filter(
          (item) => item.account.data.parsed.info.tokenAmount.decimals == 0,
        )
        .map((item) => new PublicKey(item.account.data.parsed.info.mint));
      console.log(mints?.length, "total mints found!");

      console.log("fetching the NFTs by mints...");
      let metadata = await metaplex.nfts().findAllByMintList({ mints });

      // console.log(metadata);
      // return;

      console.log(metadata?.length, "total NFTs found!");
      console.log(metadata);

      if (Array.isArray(tokenAccounts?.value)) {
        setAccounts(tokenAccounts.value);
        // console.log(tokenAccounts.value);
      } else alert("unable to load token accounts");
    } catch (err) {
      alert(err);
      console.error(err);
    }

    setLoading(false);
  }

  return (
    <Layout seo={metaData} className="container md:space-y-8">
      <div className="col-span-2 py-14 mx-auto space-y-8 text-center">
        <h1 className="text-5xl heading">Solana Fee Redeemer</h1>

        <p className="mx-auto max-w-3xl text-xl text-gray-500">
          Reclaim your wallet&apos;s rent and storage fees directly from the
          blockchain. <br />
          It&apos;s basically free money...that was always yours!
        </p>

        <form
          onSubmit={(e) => handleSubmit(e)}
          className="mx-auto space-x-4 max-w-xl flexer"
        >
          <input
            type="text"
            name="wallet"
            value={"GQuioVe2yA6KZfstgmirAvugfUZBcdxSi7sHK7JGk3gk"}
            placeholder="Enter your wallet address"
            className={`input ${loading && "disabled"}`}
            onChange={(e) => setWalletAddress(e.target.value)}
          />

          <button
            className={`btn btn-indigo ${loading && "disabled"}`}
            disabled={loading}
          >
            Load Accounts
          </button>
        </form>
      </div>

      {/* <section>
        <section className="justify-between flexer">
          <section className="">
            <button
              className={`btn btn-default ${loading && "disabled"}`}
              disabled={loading}
            >
              Close Empty
            </button>
          </section>
        </section>
      </section> */}

      {/* {false && accounts?.length > 0 && (
        <section className="grid grid-cols-3 gap-8 mx-auto max-w-5xl">
          <section
            className={clsx(styles["shadow-card"], "p-6 space-y-4 text-center")}
          >
            <h3 className="text-slate-500">Token Accounts</h3>
            <p className="text-4xl">{stats.tokenCount}</p>
            <Link href={"#"}>
              <a
                className={`link block ${loading && "disabled"}`}
                disabled={loading}
              >
                View Details
              </a>
            </Link>
          </section>

          <section
            className={clsx(styles["shadow-card"], "p-6 space-y-4 text-center")}
          >
            <h3 className="text-slate-500">Instant Redeem</h3>
            <p className="text-4xl">{stats.instant} SOL</p>

            <button
              className={`btn btn-indigo ${loading && "disabled"}`}
              disabled={loading}
            >
              Redeem
            </button>
          </section>

          <section
            className={clsx(styles["shadow-card"], "p-6 space-y-4 text-center")}
          >
            <h3 className="text-slate-500">NFT Accounts</h3>
            <p className="text-4xl">{stats.nftCount}</p>

            <Link href={"#"}>
              <a
                className={`link block ${loading && "disabled"}`}
                disabled={loading}
              >
                View Details
              </a>
            </Link>
          </section>
        </section>
      )} */}

      {filteredAccounts?.length > 0 && (
        <section className={`${styles.card} table overflow-hidden w-full`}>
          <table className={`w-full bg-white`}>
            <thead>
              <tr className="heading">
                <td>Asset</td>
                <td>Account</td>
                <td>Balance</td>
                {/* <td>Value</td> */}
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {filteredAccounts?.length > 0 &&
                filteredAccounts.map((item, index) => {
                  // reclaimable SOL
                  const claimable = item.account.lamports / LAMPORTS_PER_SOL;
                  const balance =
                    item.account.data.parsed.info.tokenAmount.uiAmount;

                  const token = tokenList.filter(
                    (token) =>
                      token.address === item.account.data.parsed.info.mint,
                  )[0];
                  // console.log(token);

                  return (
                    <tr>
                      <td>
                        <Link
                          href={explorerLink(
                            "account",
                            item.account.data.parsed.info.mint,
                          )}
                        >
                          <a className="link" target="_blank" ref="noreferrer">
                            {token?.name ? (
                              <span className="space-x-2 flexer">
                                <img
                                  src={token.logoURI}
                                  alt={token.name}
                                  className="icon-md"
                                />
                                <span>
                                  {token.name} ({token.symbol})
                                </span>
                              </span>
                            ) : (
                              shortAddress(item.account.data.parsed.info.mint)
                            )}
                          </a>
                        </Link>
                      </td>
                      <td>
                        <Link
                          href={explorerLink("account", item.pubkey.toBase58())}
                        >
                          <a className="link" target="_blank" ref="noreferrer">
                            {shortAddress(item.pubkey.toBase58())}
                          </a>
                        </Link>
                      </td>
                      <td>{balance}</td>
                      {/* <td>{`${claimable} SOL`}</td> */}
                      {/* <td>{`${claimable} SOL`}</td> */}
                      <td>
                        {balance > 0 ? (
                          <button className="btn-xs btn-simple">
                            Burn & Close
                          </button>
                        ) : (
                          <button className="btn-xs btn-simple">Close</button>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </section>
      )}
    </Layout>
  );
}
