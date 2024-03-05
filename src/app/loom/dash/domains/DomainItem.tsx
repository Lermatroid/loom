import { Card } from "@/components/ui/card";
import { links } from "@/db/schema";
import Image from "next/image";

type linkType = typeof links.$inferSelect;

export default function DomainItem() {
	return (
		<Card className="flex shadow-md border border-muted">
			<div className="h-[100px] aspect-square relative">
				<Image src="/img/loom.png" alt="" fill className="p-5 rounded-full overflow-hidden" />
			</div>
			<div className="flex flex-col justify-center">
				<h1 className="font-semibold text-lg font-general-sans">Loom</h1>
				<p className="text-muted-foreground text-sm">go.loomapp.io</p>
			</div>
			<div className="mr-0"></div>
		</Card>
	);
}
