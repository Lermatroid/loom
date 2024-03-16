import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { env } from "@/env";
import { db } from "@/db";
import { and, eq } from "drizzle-orm";
import { links } from "@/db/schema";
import { notFound } from "next/navigation";

export async function middleware(request: NextRequest) {
	// Get the origin and path from the request URL
	const url = new URL(request.url);
	const origin = url.origin.replace("http://", "").replace("https://", "");
	const path = url.pathname;

	// Check if should be sending user to the admin panel
	if (isCoreURL(origin) && (path === "/loom" || path.startsWith("/loom/"))) {
		return NextResponse.next();
	}

	// Check if the link is in the database
	const link = await db.query.links.findFirst({
		where: and(eq(links.domain, origin), eq(links.slug, path)),
	});

	// If the link is not found, return 404
	if (!link) {
		return NextResponse.rewrite(new URL("/loom/not-found", request.url));
	}

	return NextResponse.redirect(link.to);
}

function isCoreURL(origin: string) {
	// prettier-ignore
	return (process.env.NODE_ENV === "development" && (origin.startsWith("localhost") || origin.startsWith("127.0.0.1"))) || origin === env.CORE_DOMAIN;
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: [
		{
			// Matches any route that does not start with /_next/static or /_next/image or is the favicon
			source: "/((?!_next/static|_next/image|loom/img|favicon.ico).*)",
		},
	],
};
