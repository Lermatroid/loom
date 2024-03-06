import { SideBarItem, ToggleThemeButton } from "./SideBarClientItems";
import Link from "next/link";

import { Globe, Link as LinkIcon, Home as HomeIcon, Settings as SettingsIcon } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr] font-general-sans">
			<div className="hidden border-r bg-card lg:block dark:bg-card">
				<div className="flex h-full max-h-screen flex-col gap-2">
					<div className="flex h-[60px] items-center px-6">
						<Link className="flex items-center gap-2 font-semibold" href="#">
							{/* <Package2Icon className="h-6 w-6" /> */}
							<span className="">Loom</span>
						</Link>
						<ToggleThemeButton />
					</div>
					<div className="flex-1 overflow-auto py-2">
						<nav className="grid items-start px-4 text-sm font-medium">
							<SideBarItem path="/">
								<HomeIcon className="h-4 w-4" />
								Home
							</SideBarItem>
							<SideBarItem path="/links">
								<LinkIcon className="h-4 w-4" />
								Links
							</SideBarItem>
							<SideBarItem path="/domains">
								<Globe className="h-4 w-4" />
								Domains
							</SideBarItem>
							<SideBarItem path="/settings">
								<SettingsIcon className="h-4 w-4" />
								Settings
							</SideBarItem>
						</nav>
					</div>
				</div>
			</div>
			<div>{children}</div>
		</div>
	);
}
