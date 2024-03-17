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
import { useDebouncedCallback } from "use-debounce";

export default function LinkPageOptions() {
	// const router = useRouter();
	// const searchParams = useSearchParams();
	// const pathname = usePathname();
	// const sort = params.get("sort");

	// function onSortSelectChange(v: string) {
	// 	const params = new URLSearchParams(searchParams);
	// 	console.log("value changed to ", v);
	// 	params.set("sort", v);
	// 	router.push(`${pathname}?${params.toString()}`);
	// }

	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();

	function onSortSelectChange(v: string) {
		console.log("value changed to ", v);
		const params = new URLSearchParams(searchParams);
		if (v) {
			params.set("sort", v);
		} else {
			params.delete("sort");
		}
		router.replace(`${pathname}?${params.toString()}`);
	}

	const onSearchChange = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const params = new URLSearchParams(searchParams);
		console.log("search changed");
		console.log("e: ", e);

		const v = e.target.value;
		console.log("v: ", v);

		if (v && v.length > 0) {
			params.set("q", v);
		} else {
			params.delete("q");
		}
		router.replace(`${pathname}?${params.toString()}`);
	}, 500);

	return (
		<Card className="w-full rounded-lg h-full px-4 py-6 flex flex-col gap-y-1">
			<p className="text-md font-bold">Search Links</p>
			<Input onChange={onSearchChange} defaultValue={searchParams.get("q")?.toString() || ""} />
			<Separator className="my-6" />
			<p className="text-md font-bold">Sort Links</p>
			<Select
				onValueChange={onSortSelectChange}
				defaultValue={searchParams.get("sort")?.toString() || "recent"}
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
