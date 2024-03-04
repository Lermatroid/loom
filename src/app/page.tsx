import { redirect } from "next/navigation";
import { validateRequest } from "@/auth";

export default async function Page() {
	const { user } = await validateRequest();
	if (!user) {
		return <h1>You are not logged in</h1>;
	}
	return <h1>Hi, {user.username}! You are logged in!</h1>;
}
