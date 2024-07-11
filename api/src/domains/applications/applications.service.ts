import { InferInsertModel } from "drizzle-orm";
import { applications } from "./applications.schema";
import { db } from "../../db";
import { AppError } from "../../utils/AppError";

export const createApplication = async (payload: InferInsertModel<typeof applications>) => {
  const companyExists = await db.query.companies.findFirst({
    where: (companies, { eq }) => eq(companies.id, payload.companyId),
  });

  if (!companyExists) throw new AppError(404, "Company not found");
  const query = await db.insert(applications).values(payload).returning();
  return query[0];
};

export const getApplications = async () => {
  return await db.query.applications.findMany({
    with: {
      company: true,
    },
  });
};

export const getApplicationsByUser = async (userId: string) => {
  return await db.query.applications.findMany({
    where: (applications, { eq }) => eq(applications.userId, userId),
  });
};

export const getApplicationById = async (id: string) => {
  return await db.query.applications.findFirst({
    where: (applications, { eq }) => eq(applications.id, id),
  });
};
