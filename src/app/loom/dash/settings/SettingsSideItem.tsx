"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

interface SideBarItemProps {
	children: React.ReactNode;
	path: string;
}

export default function SettingsSideItem({ children, path }: SideBarItemProps) {
	const currPath = usePathname();

	return (
		<Link
			className={
				(path !== "/" && currPath.replace("/loom/dash/settings", "").startsWith(path)) ||
				(currPath == "/loom/dash/settings" && path == "/")
					? "h-min flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
					: "h-min flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
			}
			href={"/loom/dash/settings" + path}
		>
			{/* <HomeIcon className="h-4 w-4" />
        Home */}
			{children}
		</Link>
	);
}
