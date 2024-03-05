import {
	bigserial,
	text,
	varchar,
	uniqueIndex,
	boolean,
	timestamp,
	integer,
	json,
	index,
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
	id: varchar("id").primaryKey(),
	domain: text("domain").unique(),
	name: varchar("name").notNull(),
	icon: varchar("icon").notNull(),
});

export const domainRelations = relations(domains, ({ many }) => ({
	posts: many(links),
}));

export const links = pgTable(
	"link",
	{
		to: varchar("to").notNull(),
		slug: varchar("slug").notNull(),
		domain: text("domain").notNull(),
		domainID: varchar("domain_id").notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
	},
	(table) => {
		return {
			domainIdx: index("domain_idx").on(table.domain),
			createdIdx: index("created_idx").on(table.createdAt),
			id: primaryKey({ columns: [table.domain, table.slug] }),
		};
	}
);

export const linksRelations = relations(links, ({ one }) => ({
	domainData: one(domains, {
		fields: [links.domainID],
		references: [domains.id],
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
