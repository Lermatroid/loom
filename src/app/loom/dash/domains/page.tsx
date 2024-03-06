import {
	TableHead,
	TableRow,
	TableHeader,
	TableCell,
	TableBody,
	Table,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import DomainItem from "./DomainItem";
import NewDomain from "./NewDomain";
import { db } from "@/db";

export default async function Page() {
	const domains = await db.query.domains.findMany();

	return (
		<div className="mx-20 mt-20">
			<div className="pb-20 flex items-start w-full">
				<h1 className="font-semibold text-4xl font-general-sans">Domains</h1>
				<NewDomain />
			</div>
			<div className="grid xl:grid-cols-2 grid-cols-1 gap-4">
				{domains.map((d) => {
					return (
						<DomainItem
							key={d.id}
							name={d.name}
							domain={d.domain}
							icon={d.icon}
							linkCount={0}
							href={d.domain}
						/>
					);
				})}
			</div>
		</div>
	);
}
