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
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Link as LinkIcon } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useAction } from "next-safe-action/hooks";
import { newLink } from "@/actions/links";

const newLinkValidator = z.object({
	to: z.string().url(),
	domain: z.string().min(1),
	slug: z
		.string()
		.min(1)
		.refine((s) => !s.startsWith("/"), { message: "Your link slug should not start with /" })
		.refine((s) => !s.includes(" "), { message: "Your link slug should not contain spaces" }),
});

interface NewLinkProps {
	domainOptions: string[];
}

export default function NewLink({ domainOptions }: NewLinkProps) {
	const form = useForm<z.infer<typeof newLinkValidator>>({
		resolver: zodResolver(newLinkValidator),
		defaultValues: {
			to: "",
			domain: "",
			slug: "",
		},
	});

	const { execute } = useAction(newLink, {
		async onSuccess(d) {
			console.log("added new link!");
			console.log(d.message);
			if (!d.success) return;
			alert("Link added successfully with ID " + d.link);
		},
		async onError(e) {
			console.error(e);
			alert("Error adding link");
		},
	});

	async function onSubmit(values: z.infer<typeof newLinkValidator>) {
		const { domain, to, slug } = values;

		execute({
			domain,
			to,
			slug,
		});
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="ml-auto justify-self-end flex items-center gap-x-1" size={"sm"}>
					<LinkIcon size={16} />
					New Link
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>New Link</DialogTitle>
					<DialogDescription>Add a new link to your Loom</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className="grid gap-4 py-4">
							<FormField
								control={form.control}
								name="to"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Destination URL</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormDescription>
											This will be the URL users will get redirected to when visiting your short
											link
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="domain"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Domain</FormLabel>
										<Select onValueChange={field.onChange} defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select a verified email to display" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{domainOptions.map((domain) => (
													<SelectItem value={domain}>{domain}</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormDescription>
											You can manage email addresses in your{" "}
											<Link href="/examples/forms">email settings</Link>.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="slug"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Slug</FormLabel>
										<FormControl>
											<div className="flex">
												<div className="bg-accent text-primary flex h-10 w-10 items-center justify-center rounded-l text-lg px-2 font-medium">
													/
												</div>
												<Input className="rounded-l-none" {...field} />
											</div>
										</FormControl>
										<FormDescription>
											This will be the part after your domain for your short link
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
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
