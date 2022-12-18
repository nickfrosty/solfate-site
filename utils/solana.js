export function shortAddress(address, charCount = 4) {
  // if (address?.toBase58()) address = address.toBase58();
  if (typeof address !== "string") return "[error]";

  return `${address.substring(0, charCount)}...${address.substring(
    address.length - charCount,
  )}`;
}

export function explorerLink(type, value) {
  /*
    Types: 'account', 'tx'
  */

  return `https://solscan.io/${type}/${value}`;
}
