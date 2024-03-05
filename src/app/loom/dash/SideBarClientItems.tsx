"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

interface SideBarItemProps {
	children: React.ReactNode;
	path: string;
}

export function SideBarItem({ children, path }: SideBarItemProps) {
	const currPath = usePathname();

	return (
		<Link
			className={
				(path !== "/" && currPath.replace("/loom/dash", "").startsWith(path)) ||
				(currPath == "/loom/dash" && path == "/")
					? "flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
					: "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
			}
			href={"/loom/dash" + path}
		>
			{/* <HomeIcon className="h-4 w-4" />
        Home */}
			{children}
		</Link>
	);
}

export function ToggleThemeButton() {
	return (
		<Button onClick={toggleTheme} className="ml-auto h-8 w-8" size="icon" variant="outline">
			<Sun className="h-4 w-4" />
			<span className="sr-only">Toggle Theme</span>
		</Button>
	);
}

function toggleTheme() {
	document.body.classList.toggle("dark");
	setCookie("loom_theme", [...document.body.classList].includes("dark") ? "dark" : "light", 365);
}

function setCookie(cname: string, cvalue: string, exdays: number) {
	const d = new Date();
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
	let expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
