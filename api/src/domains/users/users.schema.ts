import { pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { InferSelectModel, relations } from "drizzle-orm";
import { jobApplications } from "../job-applications/job-applications.schema.js";

const ROLES = ["user", "admin", "superadmin"] as const;

export const rolesEnum = pgEnum("roles", ROLES);

export const users = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  username: varchar("username", { length: 256 }).notNull().unique(),
  fullName: varchar("full_name"),
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
  email: (schema) =>
    schema.email
      .trim()
      .email("Please enter a valid email address")
      .max(255, "Email must not exceed 255 characters long"),
  username: (schema) =>
    schema.username
      .trim()
      .min(3, "Username must be at least 3 characters long")
      .max(255, "Username must not exceed 255 characters long"),
  fullName: (schema) => schema.fullName.max(255, "Full name must not exceed 255 characters long"),
  password: (schema) =>
    schema.password
      .min(6, "Password must be at least 6 characters long")
      .max(255, "Password must not exceed 255 characters long"),
});

export const selectUserSchema = createSelectSchema(users);

export type User = InferSelectModel<typeof users>;
