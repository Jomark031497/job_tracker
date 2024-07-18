import { ApplicationStatus } from "./applications.schema";

export type Application = {
  id: string;
  userId: string;
  status: ApplicationStatus;
  applicationDate: Date;
  description?: string | null;
  role: string;
  expectedSalary: number | null;
  contactPerson?: string | null;
  companyName: string;
  companyWebsite?: string | null;
  platform: string;
  createdAt: Date;
  updatedAt: Date;
};
