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
import { useState } from "react";
import Image from "next/image";
import { useAction } from "next-safe-action/hooks";
import { newDomain } from "@/actions/domains";
import { urlWithoutProtocolValidator } from "@/lib/validators";

const newDomainValidator = z.object({
	url: urlWithoutProtocolValidator,
	name: z.string().min(1),
});

export default function NewDomain() {
	const form = useForm<z.infer<typeof newDomainValidator>>({
		resolver: zodResolver(newDomainValidator),
		defaultValues: {
			name: "",
			url: "",
		},
	});

	const [photoURL, setPhotoURL] = useState<string | null>(null);

	const { execute } = useAction(newDomain, {
		async onSuccess({ success }) {
			if (success) {
				// form.reset();
				// setPhotoURL(null);
				alert("Domain added successfully!");
			}
		},
		async onError(error) {
			console.log(`Error adding domain:`, error);
		},
		async onExecute() {
			console.log("Executing...");
		},
		onSettled() {
			console.log("Settled...");
		},
	});

	async function onSubmit(values: z.infer<typeof newDomainValidator>) {
		console.log("running submit");

		const urlValidator = z.string().url();
		const validatedPhotoURL = urlValidator.safeParse(photoURL);

		if (validatedPhotoURL.success === false) {
			alert("Please upload a domain icon!");
			return;
		}

		execute({
			domain: values.url,
			name: values.name,
			photo: validatedPhotoURL.data,
		});

		return;
	}

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
					<DialogDescription>Add a new custom domain to your Loom</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className="grid gap-4 py-4">
							<FormField
								control={form.control}
								name="url"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Domain</FormLabel>
										<FormControl>
											<div className="flex">
												<div className="bg-accent text-primary flex h-10 items-center justify-center rounded-l text-sm px-2 font-medium font-light">
													https://
												</div>
												<Input className="rounded-l-none" {...field} />
											</div>
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
								{photoURL === null ? (
									<UploadDropzone
										config={{ mode: "auto" }}
										className="ut-button:bg-primary ut-button:text-primary-foreground ut-label:text-foreground"
										endpoint="imageUploader"
										onClientUploadComplete={(res) => {
											// Do something with the response
											const file = res[0];
											setPhotoURL(file.url);
										}}
										onUploadError={(error: Error) => {
											alert(`Error uploading domain image: ${error.message}`);
										}}
										onUploadBegin={(name) => {
											// Do something once upload begins
											console.log("Uploading: ", name);
										}}
									/>
								) : (
									<div className="flex flex-col items-center pb-5 border rounded border-border mt-2">
										<Image
											src={photoURL}
											alt=""
											height={150}
											width={150}
											className="p-5 rounded-full overflow-hidden"
										/>
										<Button onClick={() => setPhotoURL(null)}>Change Icon</Button>
									</div>
								)}
							</div>
						</div>
						<DialogFooter>
							<Button type="submit">Add Domain</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
