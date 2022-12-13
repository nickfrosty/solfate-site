import NavLink from "./header/NavLink";

export default function AppNav({ className }) {
  return (
    <nav className={`${className || ""}`}>
      <NavLink href="/faucet">Faucet</NavLink>
      <NavLink href="/extension">Extension</NavLink>
      <NavLink href="/cli">CLI</NavLink>
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
