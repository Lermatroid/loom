"use server";

import { z } from "zod";
import { authenticatedAction } from "@/lib/safe-action";
import { urlWithoutProtocolValidator } from "@/lib/validators";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { domains } from "@/db/schema";
import { nanoid } from "nanoid";

const newDomainSchema = z.object({
	name: z.string().min(1),
	domain: urlWithoutProtocolValidator,
	photo: z.string().url(),
});

export const newDomain = authenticatedAction(
	newDomainSchema,
	async ({ domain, name, photo }, { user }) => {
		const existingDomain = await db.query.domains.findFirst({
			where: eq(domains.domain, domain.toLowerCase()),
		});

		if (existingDomain) {
			return {
				success: false,
				message:
					"Domain is already in use! Please delete the old domain instance to create a new one.",
				domainID: null,
			};
		}

		const domainID = nanoid();

		await db.insert(domains).values({
			domain: domain.toLowerCase(),
			name: name,
			icon: photo,
			id: domainID,
		});

		return { success: true, message: "Domain added successfully!", domainID: domainID };
	}
);
