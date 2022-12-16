import NavLink from "./header/NavLink";

export default function AppNav({ className = "" }) {
  return (
    <nav className={className}>
      <NavLink href="/royalty">
        {/* <img
          src={"/icons/crown.svg"}
          alt={"Royalty Checker"}
          className="mr-3 icon-sm"
        /> */}
        Royalty Checker
      </NavLink>
      <NavLink href="/fees">
        {/* <img
          src={"/icons/money-bag.svg"}
          alt={"Royalty Checker"}
          className="mr-3 icon-sm"
        /> */}
        Fee Redeemer
      </NavLink>
      <NavLink href="/faucet">
        {/* <img
          src={"/icons/shower.svg"}
          alt={"Royalty Checker"}
          className="mr-3 icon-sm"
        /> */}
        Faucet
      </NavLink>
      <NavLink href="/extension">Extension</NavLink>
    </nav>
  );
}
