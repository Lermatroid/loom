import { validateRequest } from "@/auth";
import NewLink from "./NewLink";
import { db } from "@/db";

export default async function Page() {
	const { user } = await validateRequest();
	const domains = await db.query.domains.findMany();
	const links = await db.query.links.findMany();

	return (
		<div className="mx-20 mt-20">
			<div className="pb-20 flex items-start w-full">
				<h1 className="font-semibold text-4xl font-general-sans">Links</h1>
				<NewLink domainOptions={domains.map((d) => d.domain)} />
			</div>
			<div className="grid xl:grid-cols-2 grid-cols-1 gap-4">
				{links.map((link) => (
					<div className="m-2 bg-red-500">
						<p>
							{link.slug} to {link.to}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}

export const runtime = "edge";
