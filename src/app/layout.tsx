import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";

const generalSans = localFont({
	src: "../../fonts/GeneralSans.woff2",
	display: "swap",
	variable: "--font-general-sans",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${generalSans.variable}`}>
			<body>{children}</body>
		</html>
	);
}
