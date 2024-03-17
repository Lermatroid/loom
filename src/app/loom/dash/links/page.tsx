import { validateRequest } from "@/auth";
import NewLink from "./NewLink";
import { db } from "@/db";
import LinkItem from "./LinkItem";
import { TrendingUp, History as HistoryIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import LinkPageOptions from "./LinkPageOptions";
import { redirect } from "next/navigation";

export default async function Page({
	searchParams,
}: {
	searchParams?: { [key: string]: string | string[] | undefined };
}) {
	const { user } = await validateRequest();
	const domains = await db.query.domains.findMany();
	const links = await db.query.links.findMany();

	return (
		<div className="mt-20 w-full">
			<div className="pb-20 flex items-start w-full">
				<h1 className="font-semibold text-4xl font-general-sans">Links</h1>
				<NewLink domainOptions={domains.map((d) => d.domain)} />
			</div>
			<div className="w-full grid grid-cols-[300px_1fr] gap-x-4 min-h-[60vh]">
				<LinkPageOptions />
				<div className="w-full h-full">
					{/* Sort is: {searchParams?.sort}
					<br />
					Query is: {searchParams?.q} */}
					<div className="grid grid-cols-1 gap-y-2">
						{links.map((link) => (
							<LinkItem
								clicks={0}
								domain={link.domain}
								iconUrl={"/img/loom.png"}
								shortID={link.shortID}
								slug={link.slug}
								to={link.to}
								key={link.shortID}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export const runtime = "edge";
