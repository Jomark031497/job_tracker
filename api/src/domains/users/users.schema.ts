import { pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { jobApplications } from "../job-applications/job-applications.schema";

const ROLES = ["user", "admin", "superadmin"] as const;

export const rolesEnum = pgEnum("roles", ROLES);

export const users = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  username: varchar("username", { length: 256 }).notNull().unique(),
  fullName: varchar("full_name").default(""),
  email: varchar("email", { length: 256 }).unique().notNull(),
  password: varchar("password", { length: 256 }).notNull(),
  role: rolesEnum("role").default("user"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  applications: many(jobApplications),
}));

export const insertUserSchema = createInsertSchema(users, {
  email: (schema) => schema.email.email(),
});

export const selectUserSchema = createSelectSchema(users);
