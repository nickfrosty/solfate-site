/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export function SmallCard({
	title,
	image = null,
	href = "",
	description = null,
	children = null,
	meta,
	className = "",
}) {
	return (
		<Link href={href || ""}>
			<a className={`p-0 card hover-outline ${className || ""}`}>
				{/* <div className="flex-shrink-0 h-60 bg-gray-600"></div> */}
				<div className="block flex-shrink-0 w-full h-60 bg-gray-900">
					{image ? (
						<img
							src={image}
							className=""
							alt={title || "[unknown]"}
						/>
					) : (
						""
					)}
				</div>
				<div className="p-5 space-y-3">
					<h2 className="text-2xl font-bold">
						{title || "[unknown]"}
					</h2>

					{children || description ? (
						<p className="text-gray-500">
							{children || description}
						</p>
					) : (
						""
					)}
				</div>
			</a>
		</Link>
	);
}
