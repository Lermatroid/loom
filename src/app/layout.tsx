import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import { cookies } from "next/headers";

const generalSans = localFont({
	src: "../../fonts/GeneralSans.woff2",
	display: "swap",
	variable: "--font-general-sans",
});

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const theme = cookies().get("loom_theme")?.value || "light";

	return (
		<html lang="en" className={`${generalSans.variable} ${inter.variable}`}>
			<body className={theme === "dark" ? "dark" : ""}>{children}</body>
		</html>
	);
}
