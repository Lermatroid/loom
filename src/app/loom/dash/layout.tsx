import { NavBarItem, ToggleThemeButton } from "./SideBarClientItems";
import Link from "next/link";

import { Globe, Link as LinkIcon, Home as HomeIcon, Settings as SettingsIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen w-full">
			<div className="bg-primary text-primary-foreground">
				<div className="grid grid-cols-4 min-h-24 max-w-5xl mx-auto">
					<div className="flex items-center">
						<p className="font-bold text-xl">Loom</p>
					</div>
					<div className="col-span-2 flex items-center justify-center w-full">
						<div className="h-10 border-zinc-700 border-[1px] rounded-lg w-full grid grid-flow-col justify-stretch p-1 gap-1 max-w-[400px]">
							<NavBarItem path="/">Home</NavBarItem>
							<NavBarItem path="/links">Links</NavBarItem>
							<NavBarItem path="/domains">Domains</NavBarItem>
							<NavBarItem path="/settings">Settings</NavBarItem>
						</div>
					</div>
					<div className="flex items-center justify-end">
						<Avatar>
							<AvatarImage src="https://github.com/shadcn.png" />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
					</div>
				</div>
			</div>
			<div className="max-w-5xl mx-auto">{children}</div>
		</div>
	);
}
