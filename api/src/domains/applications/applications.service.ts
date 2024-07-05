import { InferInsertModel } from "drizzle-orm";
import { applications } from "./applications.schema";
import { db } from "../../db";

export const createApplication = async (payload: InferInsertModel<typeof applications>) => {
  const query = await db.insert(applications).values(payload).returning();

  return query[0];
};

export const getApplications = async () => {
  return await db.query.applications.findMany();
};

export const getApplicationById = async (id: string) => {
  return await db.query.applications.findFirst({
    where: (applications, { eq }) => eq(applications.id, id),
  });
};
