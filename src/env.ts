import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		// DATABASE_URL: z.string().url(),
		// OPEN_AI_API_KEY: z.string().min(1),
		GITHUB_CLIENT_ID: z.string().min(1),
		GITHUB_CLIENT_SECRET: z.string().min(1),
	},
	client: {
		// NEXT_PUBLIC_PUBLISHABLE_KEY: z.string().min(1),
	},

	experimental__runtimeEnv: {
		// NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
	},
});
