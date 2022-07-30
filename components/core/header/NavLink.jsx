import Link from "next/link";
import { useRouter } from "next/router";

export default function NavLink({ icon, href, title, children }) {
	const router = useRouter();
	const isCurrent = router.pathname?.startsWith(href) || false;

	return href ? (
		<Link href={href} passHref={true}>
			<a
				title={title || ""}
				className={`nav-link default ${
					isCurrent ? "active" : "inactive"
				}`}
			>
				<span className="">{children}</span>
			</a>
		</Link>
	) : (
		<></>
	);
}
