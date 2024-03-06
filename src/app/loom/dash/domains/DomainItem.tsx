import { Card } from "@/components/ui/card";
import Image from "next/image";

interface DomainItemProps {
	name: string;
	domain: string;
	icon: string;
	linkCount: number;
	href: string;
}

export default function DomainItem({ domain, href, icon, linkCount, name }: DomainItemProps) {
	return (
		<Card className="flex shadow-md border border-muted">
			<div className="h-[100px] aspect-square relative">
				<Image src={icon} alt="" fill className="p-5 rounded-full overflow-hidden" />
			</div>
			<div className="flex flex-col justify-center">
				<h1 className="font-semibold text-lg font-general-sans">{name}</h1>
				<p className="text-muted-foreground text-sm">{domain}</p>
			</div>
			<div className="mr-0"></div>
		</Card>
	);
}
