import { InferInsertModel } from "drizzle-orm";
import { companies } from "./companies.schema";
import { db } from "../../db";

export const createCompamy = async (payload: InferInsertModel<typeof companies>) => {
  const query = await db.insert(companies).values(payload).returning();
  return query[0];
};

export const getCompanies = async () => {
  return await db.query.companies.findMany({
    with: {
      applications: true,
    },
  });
};

export const getCompanyById = async (id: string) => {
  return await db.query.companies.findFirst({
    where: (companies, { eq }) => eq(companies.id, id),
  });
};
