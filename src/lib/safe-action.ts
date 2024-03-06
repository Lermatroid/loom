import { createSafeActionClient } from "next-safe-action";
import { validateRequest } from "@/auth";

export const authenticatedAction = createSafeActionClient({
	async middleware() {
		const { user } = await validateRequest();
		if (!user) {
			throw new Error("Not authenticated");
		}
		return { user };
	},
});
