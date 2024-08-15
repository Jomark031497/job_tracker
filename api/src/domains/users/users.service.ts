import { eq, InferInsertModel } from "drizzle-orm";
import { db } from "../../db/dbInstance.js";
import { users } from "./users.schema.js";
import { Argon2id } from "oslo/password";
import { AppError } from "../../utils/AppError.js";

export const getUsers = async () => {
  return await db.query.users.findMany({
    columns: {
      password: false,
    },
  });
};

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

export const updateUser = async (id: string, payload: InferInsertModel<typeof users>) => {
  const user = await getUserById(id);
  if (!user) throw new AppError(404, "user not found");

  await db
    .update(users)
    .set({
      ...user,
      ...payload,
    })
    .where(eq(users.id, id));

  return { message: "user update success" };
};

export const deleteUser = async (id: string) => {
  const user = await getUserById(id);
  if (!user) throw new AppError(404, "user not found");

  await db.delete(users).where(eq(users.id, id));

  return { message: "user delete success" };
};
