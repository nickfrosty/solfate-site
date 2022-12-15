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
      {/* <NavLink href="/cli">CLI</NavLink> */}
      {/* <NavLink href="/products">Products</NavLink> */}

      {/* {process && process.env?.NODE_ENV === "development" ? (
        <>
          <NavLink href="/articles">Articles</NavLink>
          <NavLink href="/courses">Courses</NavLink>
        </>
      ) : (
        ""
      )} */}
    </nav>
  );
}
