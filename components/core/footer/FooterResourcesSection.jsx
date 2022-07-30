import Link from "next/link";

export default function FooterResourcesSection({ columns }) {
	let columnSize = () => {
		switch (columns) {
			case 3:
				return "three-column";
			default:
				return "two-column";
		}
	};

	return (
		<section className={columnSize() || "two-column"}>
			<span className="title">Resources</span>
			<ul className="list-unstyled">
				<li>
					<Link href="/about">
						<a className="link">About Solfate</a>
					</Link>
				</li>
				{/* <li>
					<Link href="/legal/terms">
						<a className="link">Terms &amp; Conditions</a>
					</Link>
				</li> */}
				<li>
					<Link href="/legal/privacy">
						<a className="link">Privacy Policy</a>
					</Link>
				</li>
				<li>
					<Link href="https://twitter.com/SolfateLabs">
						<a className="link" target="_blank">
							Contact Us
						</a>
					</Link>
				</li>
			</ul>
		</section>
	);
}
