import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
export const responses = sqliteTable("responses", {id: integer("id").primaryKey({autoIncrement:true}),name:text("name").notNull(),normalizedName:text("normalized_name").unique(),attendance:text("attendance").notNull(),guests:text("guests").notNull().default(""),message:text("message").notNull().default(""),createdAt:text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`)});
