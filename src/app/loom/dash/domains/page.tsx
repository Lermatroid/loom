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
import { Globe } from "lucide-react";
import NewDomain from "./NewDomain";

export default function Page() {
	return (
		<div className="mx-20 mt-20">
			<div className="pb-20 flex items-start w-full">
				<h1 className="font-semibold text-4xl font-general-sans">Domains</h1>
				<NewDomain />
			</div>
			<div className="grid xl:grid-cols-2 grid-cols-1 gap-4">
				<DomainItem />
				<DomainItem />
				<DomainItem />
				<DomainItem />
			</div>
		</div>
	);
}
