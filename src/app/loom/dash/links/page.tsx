import { validateRequest } from "@/auth";
import NewLink from "./NewLink";

export default async function Page() {
	const { user } = await validateRequest();
	return (
		<div className="mx-20 mt-20">
			<div className="pb-20 flex items-start w-full">
				<h1 className="font-semibold text-4xl font-general-sans">Links</h1>
				<NewLink />
			</div>
			<div className="grid xl:grid-cols-2 grid-cols-1 gap-4"></div>
		</div>
	);
}
