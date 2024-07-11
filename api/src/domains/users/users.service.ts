import { InferInsertModel } from "drizzle-orm";
import { db } from "../../db";
import { users } from "./users.schema";
import { Argon2id } from "oslo/password";

export const getUserById = async (id: string, includePassword: boolean = true) => {
  return await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, id),
    ...(!includePassword && {
      columns: {
        password: false,
      },
    }),
  });
};

export const getUserByUsername = async (username: string, includePassword: boolean = true) => {
  return await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, username),
    ...(!includePassword && {
      columns: {
        password: false,
      },
    }),
  });
};

export const getUserByEmail = async (email: string) => {
  return await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email),
  });
};

export const createUser = async (payload: InferInsertModel<typeof users>) => {
  const hashedPassword = await new Argon2id().hash(payload.password);

  const query = await db
    .insert(users)
    .values({ ...payload, password: hashedPassword })
    .returning();

  return query[0];
};
