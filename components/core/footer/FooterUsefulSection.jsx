import Link from "next/link";

export default function FooterUsefulSection({ columns }) {
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
			<span className="title">From the Lab</span>
			<ul className="list-unstyled">
				<li>
					<Link href="/cli">
						<a className="link">CLI</a>
					</Link>
				</li>
				{/* <li>
					<Link href="/articles">
						<a className="link">Articles</a>
					</Link>
				</li> */}
				<li>
					<Link href="/extension">
						<a className="link">Extension</a>
					</Link>
				</li>
				<li>
					<Link href="/faucet">
						<a className="link">Solana Faucet</a>
					</Link>
				</li>
				{/* <li>
					<Link href="/courses">
						<a className="link">Courses</a>
					</Link>
				</li> */}
				{/* <li>
					<Link href="/#features">
						<a className="link">Features</a>
					</Link>
				</li> */}
				{/* <li>
					<Link href="/pricing">
						<a className="link">Pricing</a>
					</Link>
				</li> */}
				{/* <li>
					<Link href="/about">
						<a className="link">About Solfate</a>
					</Link>
				</li> */}
			</ul>
		</section>
	);
}
