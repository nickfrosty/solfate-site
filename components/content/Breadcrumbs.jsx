/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ChevronDoubleRightIcon } from "@heroicons/react/solid";

export function Breadcrumbs({
	data = null,
	image = null,
	children = null,
	className = "",
}) {
	return (
		<section
			className={`${className} flex justify-start items-center space-x-2 text-base font-bold tracking-wide`}
		>
			<Link href={`/articles`}>
				<a className="link-muted">Articles</a>
			</Link>
			<ChevronDoubleRightIcon className="icon-xs" />
			<Link href={`#`}>
				<a className="link">This is the article title here</a>
			</Link>
		</section>
	);
}
