import NavLink from "./header/NavLink";

export default function AppNav({ className = "" }) {
  return (
    <nav className={className}>
      <NavLink href="/podcast">Podcast</NavLink>
      <NavLink href="/newsletter">Newsletter</NavLink>
      <NavLink href="/faucet">
        {/* <img
          src={"/icons/shower.svg"}
          alt={"Royalty Checker"}
          className="mr-3 icon-sm"
        /> */}
        Faucet
      </NavLink>
      {/* <NavLink href="/extension">Extension</NavLink> */}
    </nav>
  );
}
