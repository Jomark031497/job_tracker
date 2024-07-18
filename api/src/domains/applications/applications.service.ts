import { and, eq, InferInsertModel, sql } from "drizzle-orm";
import { applications } from "./applications.schema";
import { db } from "../../db";
import { AppError } from "../../utils/AppError";

export const createApplication = async (payload: InferInsertModel<typeof applications>) => {
  const query = await db.insert(applications).values(payload).returning();
  return query[0];
};

export const getApplications = async () => {
  return await db.query.applications.findMany();
};

export const getApplicationsByUser = async (
  userId: string,
  queryParams?: Record<string, unknown>
) => {
  const pageSize = queryParams?.pageSize ? parseInt(queryParams.pageSize as string, 10) : 5;
  const page = queryParams?.page ? parseInt(queryParams.page as string) : 1;

  const query = await db.transaction(async (tx) => {
    const data = await tx.query.applications.findMany({
      where: (applications, { eq }) => eq(applications.userId, userId),
      orderBy: (applications, { desc }) => desc(applications.applicationDate),
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    const count = await tx
      .select({ count: sql`count(*)` })
      .from(applications)
      .where(eq(applications.userId, userId))
      .then((result) => Number(result[0]?.count));

    return { data, count };
  });

  return query;
};

export const getUserApplicationsOverview = async (userId: string) => {
  const query = await db.transaction(async (tx) => {
    const count = await tx
      .select({ count: sql`count(*)` })
      .from(applications)
      .where(eq(applications.userId, userId))
      .then((result) => Number(result[0]?.count));

    const submitted = await tx
      .select({ count: sql`count(*)` })
      .from(applications)
      .where(and(eq(applications.userId, userId), eq(applications.status, "submitted")))
      .then((result) => Number(result[0]?.count));

    const inProgress = await tx
      .select({ count: sql`count(*)` })
      .from(applications)
      .where(and(eq(applications.userId, userId), eq(applications.status, "in progress")))
      .then((result) => Number(result[0]?.count));

    const rejected = await tx
      .select({ count: sql`count(*)` })
      .from(applications)
      .where(and(eq(applications.userId, userId), eq(applications.status, "rejected")))
      .then((result) => Number(result[0]?.count));

    return {
      count,
      inProgress,
      submitted,
      rejected,
    };
  });

  return query;
};

export const getApplicationById = async (id: string) => {
  return await db.query.applications.findFirst({
    where: (applications, { eq }) => eq(applications.id, id),
  });
};

export const updateApplication = async (
  applicationId: string,
  payload: InferInsertModel<typeof applications>
) => {
  const existingApplication = await getApplicationById(applicationId);
  if (!existingApplication) throw new AppError(404, "Application id not found");

  const updatedApplication = await db
    .update(applications)
    .set({
      ...existingApplication,
      ...payload,
    })
    .returning();

  return updatedApplication;
};

export const deleteApplicationById = async (applicationId: string) => {
  const existingApplication = await getApplicationById(applicationId);
  if (!existingApplication) throw new AppError(404, "application id not found");

  await db.delete(applications).where(eq(applications.id, applicationId));

  return { message: "application successfully deleted" };
};
