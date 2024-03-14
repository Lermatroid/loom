import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface LinkItemProps {
	domain: string;
	slug: string;
	clicks: number;
	iconUrl: string;
	shortID: string;
	to: string;
}

export default function LinkItem({ domain, slug, clicks, iconUrl, shortID, to }: LinkItemProps) {
	return (
		<Link href={"/loom/dash/links/" + shortID}>
			<Card className="flex border border-muted-foreground">
				<div className="h-[100px] aspect-square relative">
					<Image src={iconUrl} alt="" fill className="p-5 rounded-full overflow-hidden" />
				</div>
				<div className="flex flex-col justify-center">
					<h1 className="font-semibold text-md text-blue-800">{`${domain}/${slug}`}</h1>
					<p className="text-xs font-semibold">{to}</p>
				</div>
				<div className="mr-0"></div>
			</Card>
		</Link>
	);
}
