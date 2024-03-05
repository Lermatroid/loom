import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		// DATABASE_URL: z.string().url(),
		// OPEN_AI_API_KEY: z.string().min(1),
		GITHUB_CLIENT_ID: z.string().min(1),
		GITHUB_CLIENT_SECRET: z.string().min(1),
		CORE_DOMAIN: z
			.string()
			.refine((v) => !(v.startsWith("https://") || v.startsWith("http://")), {
				message: "CORE_DOMAIN should not include the protocol (http / https)",
			})
			.refine((v) => !v.includes("/"), {
				message: "CORE_DOMAIN should not include a path",
			})
			.transform((v) => `https://${v}`)
			.pipe(z.string().url()),
	},
	client: {
		// NEXT_PUBLIC_PUBLISHABLE_KEY: z.string().min(1),
	},

	experimental__runtimeEnv: {
		// NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
	},
});
