import { z } from "zod";

export const APPLICATION_STATUS = ["submitted", "in progress", "rejected", "hired"] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUS)[number];

export const applicationSchema = z.object({
  status: z.enum(APPLICATION_STATUS),
  companyName: z.string().min(1).max(255),
  companyWebsite: z.string().nullish(),
  contactPerson: z.string().max(255).nullish(),
  description: z.string().nullish(),
  role: z.string().min(1).max(100),
  applicationDate: z.date(),
  platform: z.string().min(1).max(50),
  expectedSalary: z.number(),
  isPublic: z.boolean(),
});

export type ApplicationInputs = z.infer<typeof applicationSchema>;
