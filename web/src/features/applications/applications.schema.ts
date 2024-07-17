import { z } from "zod";

export const applicationSchema = z.object({
  status: z.string(),
  companyName: z.string(),
  companyWebsite: z.string().nullish(),
  contactPerson: z.string().nullish(),
  description: z.string().nullish(),
  role: z.string(),
  applicationDate: z.date(),
  platform: z.string(),
  expectedSalary: z.number(),
});
