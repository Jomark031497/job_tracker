import { JobApplicationStatus } from "./applications.schema";

export type Application = {
  id: string;
  userId: string;
  status: JobApplicationStatus;
  applicationDate: Date;
  description?: string | null;
  role: string;
  expectedSalary: number;
  contactPerson?: string | null;
  companyName: string;
  companyWebsite?: string | null;
  platform: string;
  createdAt: Date;
  updatedAt: Date;
  isPublic: boolean;
};
