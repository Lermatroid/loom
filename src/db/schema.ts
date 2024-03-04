import {
	bigserial,
	text,
	varchar,
	uniqueIndex,
	boolean,
	timestamp,
	integer,
	json,
	pgEnum,
	primaryKey,
	pgTable,
} from "drizzle-orm/pg-core";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { relations } from "drizzle-orm";

export const userTable = pgTable("user", {
	id: text("id").primaryKey(),
	github_id: varchar("github_id").notNull(),
	username: varchar("username").notNull(),
});

export const domains = pgTable("domains", {
	domain: text("domain").primaryKey(),
	name: varchar("name").notNull(),
	color: varchar("color").notNull(),
});

export const domainRelations = relations(domains, ({ many }) => ({
	posts: many(links),
}));

export const links = pgTable("link", {
	from: varchar("slug").notNull().unique(),
	to: varchar("url").notNull(),
	slug: varchar("slug").notNull(),
	domain: text("domain").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const linksRelations = relations(links, ({ one }) => ({
	domainData: one(domains, {
		fields: [links.domain],
		references: [domains.domain],
	}),
}));

export const sessionTable = pgTable("session", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => userTable.id),
	expiresAt: timestamp("expires_at", {
		withTimezone: true,
		mode: "date",
	}).notNull(),
});
