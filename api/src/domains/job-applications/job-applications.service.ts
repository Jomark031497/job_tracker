import { and, eq, InferInsertModel, sql } from "drizzle-orm";
import { jobApplications } from "./job-applications.schema";
import { db } from "../../db";
import { AppError } from "../../utils/AppError";

export const createJobApplication = async (payload: InferInsertModel<typeof jobApplications>) => {
  const query = await db.insert(jobApplications).values(payload).returning();
  return query[0];
};

export const getJobApplications = async (queryParams?: Record<string, unknown>) => {
  const isPublic = queryParams?.isPublic ? !!queryParams.isPublic : false;

  return await db.transaction(async (tx) => {
    const data = await tx.query.jobApplications.findMany({
      where: (applications, { eq }) => eq(applications.isPublic, isPublic),
    });

    const count = await tx
      .select({ count: sql`count(*)` })
      .from(jobApplications)
      .where(eq(jobApplications.isPublic, isPublic))
      .then((result) => Number(result[0]?.count));

    return { data, count };
  });
};

export const getJobApplicationsByUser = async (
  userId: string,
  queryParams?: Record<string, unknown>
) => {
  const pageSize = queryParams?.pageSize ? parseInt(queryParams.pageSize as string, 10) : 5;
  const page = queryParams?.page ? parseInt(queryParams.page as string) : 1;

  const query = await db.transaction(async (tx) => {
    const data = await tx.query.jobApplications.findMany({
      where: (applications, { eq }) => eq(applications.userId, userId),
      orderBy: (applications, { desc }) => desc(applications.applicationDate),
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    const count = await tx
      .select({ count: sql`count(*)` })
      .from(jobApplications)
      .where(eq(jobApplications.userId, userId))
      .then((result) => Number(result[0]?.count));

    return { data, count };
  });

  return query;
};

export const getUserJobApplicationsOverview = async (userId: string) => {
  const query = await db.transaction(async (tx) => {
    const count = await tx
      .select({ count: sql`count(*)` })
      .from(jobApplications)
      .where(eq(jobApplications.userId, userId))
      .then((result) => Number(result[0]?.count));

    const submitted = await tx
      .select({ count: sql`count(*)` })
      .from(jobApplications)
      .where(and(eq(jobApplications.userId, userId), eq(jobApplications.status, "submitted")))
      .then((result) => Number(result[0]?.count));

    const inProgress = await tx
      .select({ count: sql`count(*)` })
      .from(jobApplications)
      .where(and(eq(jobApplications.userId, userId), eq(jobApplications.status, "in progress")))
      .then((result) => Number(result[0]?.count));

    const rejected = await tx
      .select({ count: sql`count(*)` })
      .from(jobApplications)
      .where(and(eq(jobApplications.userId, userId), eq(jobApplications.status, "rejected")))
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

export const getJobApplicationById = async (id: string) => {
  return await db.query.jobApplications.findFirst({
    where: (applications, { eq }) => eq(applications.id, id),
  });
};

export const updateJobApplication = async (
  applicationId: string,
  payload: InferInsertModel<typeof jobApplications>
) => {
  const existingApplication = await getJobApplicationById(applicationId);
  if (!existingApplication) throw new AppError(404, "Application id not found");

  const updatedApplication = await db
    .update(jobApplications)
    .set({
      ...existingApplication,
      ...payload,
    })
    .returning();

  return updatedApplication;
};

export const deleteJobApplicationById = async (applicationId: string) => {
  const existingApplication = await getJobApplicationById(applicationId);
  if (!existingApplication) throw new AppError(404, "application id not found");

  await db.delete(jobApplications).where(eq(jobApplications.id, applicationId));

  return { message: "application successfully deleted" };
};
