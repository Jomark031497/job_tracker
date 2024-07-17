import { z } from "zod";

export const applicationSchema = z.object({
  status: z.string(),
  companyName: z.string().min(3),
  companyWebsite: z.string().nullish(),
  contactPerson: z.string().nullish(),
  description: z.string().nullish(),
  role: z.string().min(1),
  applicationDate: z.date(),
  platform: z.string().min(1),
  expectedSalary: z.number(),
});

export type ApplicationInputs = z.infer<typeof applicationSchema>;
