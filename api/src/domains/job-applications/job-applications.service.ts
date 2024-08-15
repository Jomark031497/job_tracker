import { and, eq, InferInsertModel, sql } from "drizzle-orm";
import { jobApplications, notes } from "./job-applications.schema.js";
import { db } from "../../db/dbInstance.js";
import { AppError } from "../../utils/AppError.js";

export const createJobApplication = async (
  payload: InferInsertModel<typeof jobApplications> & { initialNote?: string },
) => {
  const query = await db.transaction(async (tx) => {
    const { initialNote, ...jobApplicationData } = payload;

    // Create the job application
    const [newJobApplication] = await tx.insert(jobApplications).values(jobApplicationData).returning();

    if (!newJobApplication) throw new AppError(400, "Unable to create new job application");

    // create initial note if provided
    if (initialNote) {
      await tx.insert(notes).values({
        jobApplicationId: newJobApplication?.id,
        status: newJobApplication?.status,
        body: initialNote,
        createdAt: newJobApplication?.createdAt,
      });
    }

    const newJobApplicationWithNote = await tx.query.jobApplications.findFirst({
      where: (jobApplications, { eq }) => eq(jobApplications.id, newJobApplication.id),
      with: {
        notes: true,
      },
    });

    if (!newJobApplicationWithNote) throw new AppError(400, "Unable to create new job application");

    return newJobApplicationWithNote;
  });

  return query;
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

export const getUserJobApplications = async (userId: string, queryParams?: Record<string, unknown>) => {
  const pageSize = queryParams?.pageSize ? parseInt(queryParams.pageSize as string, 10) : 5;
  const page = queryParams?.page ? parseInt(queryParams.page as string) : 1;

  const query = await db.transaction(async (tx) => {
    const data = await tx.query.jobApplications.findMany({
      where: (applications, { eq }) => eq(applications.userId, userId),
      orderBy: (applications, { desc }) => desc(applications.applicationDate),
      limit: pageSize,
      offset: (page - 1) * pageSize,
      with: {
        notes: true,
      },
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
    with: {
      notes: true,
    },
  });
};

export const getUserJobApplicationById = async (id: string, userId: string) => {
  const query = await db.query.jobApplications.findFirst({
    where: (applications, { eq, and }) => and(eq(applications.id, id), eq(applications.userId, userId)),
  });

  if (!query) throw new AppError(404, "Job Application not found/Access denied");
};

export const updateJobApplication = async (
  id: string,
  userId: string,
  payload: InferInsertModel<typeof jobApplications>,
) => {
  const updatedApplication = await db
    .update(jobApplications)
    .set(payload)
    .where(and(eq(jobApplications.id, id), eq(jobApplications.userId, userId)))
    .returning();

  if (updateJobApplication.length === 0)
    throw new AppError(404, "Application not found or you don't have permission to update it");

  return updatedApplication;
};

export const deleteJobApplicationById = async (id: string, userId: string) => {
  const existingApplication = await getJobApplicationById(id);
  if (!existingApplication) throw new AppError(404, "application id not found");

  const query = await db
    .delete(jobApplications)
    .where(and(eq(jobApplications.id, id), eq(jobApplications.userId, userId)))
    .returning();

  if (query.length === 0) throw new AppError(404, "Application not found or you don't have permission to delete it");

  return query;
};
