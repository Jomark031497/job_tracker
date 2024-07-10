import { integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { applications } from "../applications/applications.schema";

export const users = pgTable("users", {
  id: text("id")
    .primaryKey()
    .unique()
    .$defaultFn(() => createId()),
  username: varchar("username", { length: 256 }).notNull().unique(),
  email: varchar("email", { length: 256 }).unique(),
  githubId: integer("github_id").unique(),
  password: varchar("password", { length: 256 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  applications: many(applications),
}));

export const insertUserSchema = createInsertSchema(users, {
  email: (schema) => schema.email.email(),
});

export const selectUserSchema = createSelectSchema(users);
