import { z } from "zod";

export const urlWithoutProtocolValidator = z
	.string()
	.refine((v) => !(v.startsWith("https://") || v.startsWith("http://")), {
		message: "Domain should not include a protocol (http / https)",
	})
	.refine((v) => !v.includes("/"), {
		message: "Domain should not include a path",
	})
	.transform((v) => `https://${v}`)
	.pipe(z.string().url())
	.transform((v) => v.replace("https://", ""));
