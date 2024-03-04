CREATE TABLE IF NOT EXISTS "domains" (
	"domain" text PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"color" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "link" (
	"slug" varchar NOT NULL,
	"url" varchar NOT NULL,
	"domain" text NOT NULL,
	CONSTRAINT "link_slug_unique" UNIQUE("slug")
);
