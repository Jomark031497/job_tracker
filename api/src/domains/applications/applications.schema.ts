import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { users } from "../users/users.schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

const APPLICATION_STATUS = [
  "submitted",
  "initial interview",
  "assessment",
  "endorsement",
  "client interview",
  "job offer",
  "rejected",
  "hired",
  "pooling",
] as const;

export const statusEnum = pgEnum("status", APPLICATION_STATUS);

export const applications = pgTable("applications", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  status: statusEnum("status").notNull().default("submitted"),
  applicationDate: timestamp("application_date", { mode: "string" }).notNull().defaultNow(),
  description: text("description"),
  role: varchar("role").notNull(),
  expectedSalary: integer("expected_salary"),
  contactPerson: varchar("contact_person"),
  companyName: varchar("company_name", { length: 255 }).notNull(),
  companyWebsite: varchar("company_website"),
  platform: varchar("platform").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const applicationsRelations = relations(applications, ({ one }) => ({
  user: one(users, {
    fields: [applications.userId],
    references: [users.id],
  }),
}));

export const insertApplicationsSchema = createInsertSchema(applications, {
  companyName: (schema) => schema.companyName.min(1),
});

export const selectApplicationsSchema = createSelectSchema(applications);
