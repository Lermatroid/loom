"use client";

import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogFooter,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadButton } from "@/lib/uploadthing";

const newDomainValidator = z.object({
	url: z.string().url(),
	name: z.string().min(1),
	photo: z.instanceof(File),
});

export default function NewDomain() {
	const form = useForm<z.infer<typeof newDomainValidator>>({
		resolver: zodResolver(newDomainValidator),
		defaultValues: {
			name: "",
			url: "",
			photo: new File([], ""),
		},
	});

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="ml-auto justify-self-end flex items-center gap-x-1" size={"sm"}>
					<Globe size={16} />
					New Domain
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>New Domain</DialogTitle>
					<DialogDescription>Add a new custom domain to your loom</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							URL
						</Label>
						<Input id="url" defaultValue="Pedro Duarte" className="col-span-3" />
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="username" className="text-right">
							Username
						</Label>
						<Input id="username" defaultValue="@peduarte" className="col-span-3" />
					</div>
					<UploadButton
						endpoint="imageUploader"
						onClientUploadComplete={(res) => {
							// Do something with the response
							console.log("Files: ", res);
							alert("Upload Completed");
						}}
						onUploadError={(error: Error) => {
							// Do something with the error.
							alert(`ERROR! ${error.message}`);
						}}
					/>
				</div>
				<DialogFooter>
					<Button type="submit">Save changes</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
