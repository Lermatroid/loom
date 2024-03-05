import { validateRequest } from "@/auth";

export default async function Page() {
	const { user } = await validateRequest();
	return (
		<div className="mx-20 mt-20">
			<h1 className="font-semibold text-4xl font-general-sans mb-20">Overview</h1>
			{user ? <p>Howdy {user.username}! You are logged in.</p> : <p>You are not logged in</p>}
		</div>
	);
}
