import { JobApplicationStatus } from "./job-applications.schema";

export type JobApplication = {
  id: string;
  userId: string;
  status: JobApplicationStatus;
  applicationDate: Date;
  description: string | null;
  role: string;
  expectedSalary: number;
  contactPerson: string | null;
  companyName: string;
  companyWebsite: string | null;
  companyAddress: string | null;
  platform: string;
  createdAt: Date;
  updatedAt: Date;
  isPublic: boolean;
};
