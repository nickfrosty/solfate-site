/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/solid";

export function LargeCard({
	title,
	image = null,
	href = "",
	description = null,
	children = null,
	actionButton = null,
	className = "",
}) {
	return (
		<Link href={href}>
			<a
				className={`md:flex justify-between p-0 card hover-outline ${
					className || ""
				}`}
			>
				{image ? (
					<div className="sm:max-h-72 md:max-h-80 md:w-1/2 pb-2/3 overflow-hidden flex-shrink-0 bg-gray-900">
						<img
							src={image}
							className="object-cover relative left-0 w-full h-full"
							alt={title || "[unknown]"}
						/>
					</div>
				) : (
					""
				)}
				<div className="md:p-5 p-8 space-y-4">
					<h2 className="text-3xl font-bold">
						{title || "[unknown]"}
					</h2>

					{children || description ? (
						<p
							className={`text-gray-500 ${
								actionButton ? "line-clamp-4" : "line-clamp-6"
							}`}
						>
							{children || description}
						</p>
					) : (
						""
					)}

					{actionButton ? (
						<Link href={actionButton?.href || href || ""} passHref>
							<div className="btn btn-indigo inline-block w-min whitespace-nowrap">
								<span>
									{actionButton?.label ||
										(typeof actionButton === "string" &&
											actionButton) ||
										"[unknown]"}
								</span>
								<ArrowRightIcon className="icon-sm" />
							</div>
						</Link>
					) : (
						""
					)}
				</div>
			</a>
		</Link>
	);
}
