import Link from "next/link";

export default function FooterLearnSection({ columns }) {
  let columnSize = () => {
    switch (columns) {
      case 3:
        return "three-column";
      default:
        return "two-column";
    }
  };
  return (
    <section className={columnSize() || ""}>
      <span className="title">Learn</span>
      <ul className="list-unstyled">
        {/* <li>
          <Link href="/articles">
            <a className="link">Articles</a>
          </Link>
        </li> */}
        <li>
          <Link href="/courses">
            <a className="link">Courses</a>
          </Link>
        </li>
        <li>
          <Link href="/courses/intro-to-anchor">
            <a className="link">Intro to Anchor</a>
          </Link>
        </li>
        <li>
          <Link href="/courses/intro-to-solana">
            <a className="link">Intro to Solana</a>
          </Link>
        </li>
        <li>
          <Link href="/courses/solana-fundementals">
            <a className="link">Solana Fundementals</a>
          </Link>
        </li>
      </ul>
    </section>
  );
}
