import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { decimal, pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { users } from "../users/users.schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { companies } from "../companies/companies.schema";

const APPLICATION_STATUS = [
  "Submitted",
  "Interview Scheduled",
  "Interviewing",
  "Offer Extended",
  "Accepted Offer",
  "Rejected",
  "Hired",
  "On Hold",
] as const;

export const statusEnum = pgEnum("status", APPLICATION_STATUS);

export const applications = pgTable("applications", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  userId: text("user_id").notNull(),
  companyId: text("company_id")
    .notNull()
    .references(() => companies.id),
  status: statusEnum("status").notNull(),
  applicationDate: timestamp("application_date").notNull().defaultNow(),
  description: text("description"),
  role: varchar("role").notNull(),
  minSalary: decimal("min_salary"),
  maxSalary: decimal("max_salary"),
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
