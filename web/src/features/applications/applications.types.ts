export const APPLICATION_STATUS = [
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

export type Application = {
  id: string;
  userId: string;
  status: string;
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
