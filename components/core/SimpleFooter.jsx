import Link from "next/link";

export default function SimpleFooter() {
	return (
		<p className="simple-footer">
			&copy; {new Date().getFullYear()}
			<Link href="/">
				<a className="ml-1 underline">Solfate</a>
			</Link>
			. All rights reserved.
		</p>
	);
}
