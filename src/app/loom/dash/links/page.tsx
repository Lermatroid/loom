import { validateRequest } from "@/auth";
import NewLink from "./NewLink";
import { db } from "@/db";
import LinkItem from "./LinkItem";
import { TrendingUp, History as HistoryIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default async function Page() {
	const { user } = await validateRequest();
	const domains = await db.query.domains.findMany();
	const links = await db.query.links.findMany();

	return (
		<div className="mx-20 mt-20">
			<div className="pb-20 flex items-start w-full">
				<h2 className="font-semibold text-4xl">Links</h2>
				<NewLink domainOptions={domains.map((d) => d.domain)} />
			</div>
			<div className="grid grid-cols-2 gap-4">
				<div className="grid grid-cols-1 gap-y-4">
					<Badge className="flex text-md font-medium items-center gap-x-1 w-min">
						Recent
						<HistoryIcon size={16} />
					</Badge>
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
				<div className="grid grid-cols-1 gap-y-4 max-w-[450px]">
					<Badge className="flex text-md font-medium items-center gap-x-1 w-min">
						Popular
						<TrendingUp size={16} />
					</Badge>
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
	);
}

export const runtime = "edge";
