import { fileURLToPath } from "node:url";
import createJiti from "jiti";
const jiti = createJiti(fileURLToPath(import.meta.url));

jiti("./src/env");

/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config) => {
		config.externals.push("@node-rs/argon2", "@node-rs/bcrypt");
		return config;
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "utfs.io",
				port: "",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
