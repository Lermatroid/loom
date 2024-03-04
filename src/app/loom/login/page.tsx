import Link from "next/link";

export default function Page() {
	return (
		<>
			<h1>Sign in</h1>
			<Link href="/loom/login/github">Sign in with GitHub</Link>
		</>
	);
}
