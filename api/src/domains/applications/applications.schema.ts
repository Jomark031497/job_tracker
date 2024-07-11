import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { users } from "../users/users.schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { companies } from "../companies/companies.schema";

const APPLICATION_STATUS = [
  "submitted",
  "interview scheduled",
  "interviewing",
  "for offer",
  "offer accepted",
  "rejected",
  "hired",
  "on hold",
] as const;

export const statusEnum = pgEnum("status", APPLICATION_STATUS);

export const applications = pgTable("applications", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  companyId: text("company_id")
    .notNull()
    .references(() => companies.id),
  status: statusEnum("status").notNull().default("submitted"),
  applicationDate: timestamp("application_date").notNull().defaultNow(),
  description: text("description"),
  role: varchar("role").notNull(),
  minSalary: integer("min_salary"),
  maxSalary: integer("max_salary"),
  contactPerson: varchar("contact_person"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const applicationsRelations = relations(applications, ({ one }) => ({
  user: one(users, {
    fields: [applications.userId],
    references: [users.id],
  }),
  company: one(companies, {
    fields: [applications.companyId],
    references: [companies.id],
  }),
}));

export const insertApplicationsSchema = createInsertSchema(applications);

export const selectApplicationsSchema = createSelectSchema(applications);
