"use client";

import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function LinkPageOptions() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const params = new URLSearchParams(searchParams);
	const sort = params.get("sort");

	if (!sort || sort === "") {
		params.set("sort", "recent");
		router.push(`${pathname}?${params.toString()}`);
	}

	function onSortSelectChange(v: string) {
		console.log("value changed to ", v);
		params.set("sort", v);
		router.push(`${pathname}?${params.toString()}`);
	}

	return (
		<Card className="w-full rounded-lg h-full px-4 py-6 flex flex-col gap-y-1">
			<p className="text-md font-bold">Search Links</p>
			<Input></Input>
			<Separator className="my-6" />
			<p className="text-md font-bold">Sort Links</p>
			<Select
				onValueChange={onSortSelectChange}
				defaultValue={searchParams.get("sort")?.toString()}
			>
				<SelectTrigger className="w-full">
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="recent">Recent</SelectItem>
					<SelectItem value="name">Name</SelectItem>
					<SelectItem value="clicks">Clicks</SelectItem>
				</SelectContent>
			</Select>
		</Card>
	);
}
