import { Card } from "@/components/ui/card";
import { links } from "@/db/schema";
import Image from "next/image";

type linkType = typeof links.$inferSelect;

export default function DomainItem() {
	return (
		<Card className="flex shadow-md border border-gray-100">
			<div className="h-[100px] aspect-square rounded-full relative bg-red-500">
				<Image src="/img/loom.png" alt="" fill />
			</div>
			<div className="flex flex-col justify-center">
				<h1 className="font-semibold text-lg font-general-sans">Loom</h1>
				<p className="text-gray-400 text-xs font-bold">go.loomapp.io</p>
			</div>
			<div className="mr-0"></div>
		</Card>
	);
}
