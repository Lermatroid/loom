"use server";

import { z } from "zod";
import { authenticatedAction } from "@/lib/safe-action";
import { urlWithoutProtocolValidator } from "@/lib/validators";
import { db } from "@/db";
import { eq, and } from "drizzle-orm";
import { domains, links } from "@/db/schema";
import { nanoid } from "nanoid";

const newLinkSchema = z.object({
	to: z.string().url(),
	domain: z.string().min(1),
	slug: z
		.string()
		.min(1)
		.refine((s) => !s.startsWith("/"), { message: "Your link slug should not start with /" }),
});

export const newLink = authenticatedAction(
	newLinkSchema,
	async ({ to, domain, slug }, { user }) => {
		// Check that it is a valid domain

		const validDomain = await db.query.domains.findFirst({
			where: eq(domains.domain, domain),
		});

		// if (!validDomains.map((d) => d.domain).includes(domain)) {
		// 	return {
		// 		success: false,
		// 		message: "Domain not found!",
		// 		link: null,
		// 	};
		// }

		if (!validDomain) {
			return {
				success: false,
				message: "Domain not found!",
				link: null,
			};
		}

		// Check that the slug is unique to its assigned domain

		const linkLookup = await db.query.links.findFirst({
			where: and(eq(links.domain, domain), eq(links.slug, slug)),
		});

		if (linkLookup) {
			return {
				success: false,
				message: `Slug already in use on domain ${domain}`,
				link: null,
			};
		}

		// Create the new link

		const shortID = nanoid(10);

		await db.insert(links).values({
			shortID,
			to,
			slug,
			domain,
			domainID: validDomain.id,
		});

		return {
			success: true,
			message: "Link added successfully!",
			link: shortID,
		};
	}
);
