import { z } from "zod";

export const applicationSchema = z.object({
  status: z.string(),
  companyName: z.string().min(1).max(255),
  companyWebsite: z.string().nullish(),
  contactPerson: z.string().max(255).nullish(),
  description: z.string().nullish(),
  role: z.string().min(1).max(100),
  applicationDate: z.date(),
  platform: z.string().min(1).max(50),
  expectedSalary: z.number(),
});

export type ApplicationInputs = z.infer<typeof applicationSchema>;
