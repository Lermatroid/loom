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
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	FormMessage,
} from "@/components/ui/form";

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
				<Form {...form}>
					<div className="grid gap-4 py-4">
						<FormField
							control={form.control}
							name="url"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Domain</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormDescription>This will be the domain for your short links.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormDescription>A short, concise name for this domain.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div>
							<Label>Domain Icon</Label>
							<UploadDropzone
								className="ut-button:bg-primary ut-label:text-foreground"
								endpoint="imageUploader"
								onClientUploadComplete={(res) => {
									// Do something with the response
									console.log("Files: ", res);
									alert("Upload Completed");
								}}
								onUploadError={(error: Error) => {
									alert(`ERROR! ${error.message}`);
								}}
								onUploadBegin={(name) => {
									// Do something once upload begins
									console.log("Uploading: ", name);
								}}
							/>
						</div>
					</div>
				</Form>
				<DialogFooter>
					<Button type="submit">Add Domain</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
