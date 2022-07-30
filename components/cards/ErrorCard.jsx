/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ExclamationIcon } from "@heroicons/react/solid";

export function ErrorCard({
	title = "An error occured!",
	image = null,
	href = "",
	msg = "An unknown error occured. Please try again.",
	children = null,
	actionButton = null,
	className = "",
}) {
	return (
		<div className="card card-error p-6">
			<div className="flexer space-x-4">
				<div className="icon-lg place-self-start text-red-600">
					<ExclamationIcon className="" />
				</div>
				<div className="space-y-2">
					<h4 className="heading">{title}</h4>
					{msg ? <p className="text-gray-500">{msg}</p> : <></>}
				</div>
			</div>
		</div>
	);
}
