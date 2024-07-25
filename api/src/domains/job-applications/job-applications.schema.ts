import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { boolean, integer, pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { users } from "../users/users.schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

const JOB_APPLICATION_STATUS = ["submitted", "in progress", "rejected", "hired"] as const;

export const statusEnum = pgEnum("status", JOB_APPLICATION_STATUS);

export const jobApplications = pgTable("job_applications", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  status: statusEnum("status").notNull().default("submitted"),
  applicationDate: timestamp("application_date", { mode: "string" }).notNull().defaultNow(),
  description: text("description").default(""),
  role: varchar("role", { length: 100 }).notNull(),
  expectedSalary: integer("expected_salary").default(0),
  contactPerson: varchar("contact_person", { length: 255 }).default(""),
  companyName: varchar("company_name", { length: 255 }).notNull(),
  companyWebsite: text("company_website").default(""),
  companyAddress: text("company_address").default(""),
  platform: varchar("platform", { length: 50 }).notNull(),
  isPublic: boolean("is_public").default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const jobApplicationsRelations = relations(jobApplications, ({ one }) => ({
  user: one(users, {
    fields: [jobApplications.userId],
    references: [users.id],
  }),
}));

export const insertJobApplicationsSchema = createInsertSchema(jobApplications, {
  role: (schema) => schema.role.min(1).max(100),
  companyName: (schema) => schema.companyName.min(1).max(255),
  contactPerson: (schema) => schema.contactPerson.max(255),
  platform: (schema) => schema.platform.min(1).max(255),
});

export const selectJobApplicationsSchema = createSelectSchema(jobApplications);
