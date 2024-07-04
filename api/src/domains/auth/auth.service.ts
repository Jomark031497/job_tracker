import { InferInsertModel } from "drizzle-orm";
import { users } from "../users/users.schema";
import {
  createUser,
  getUserByEmail,
  getUserById,
  getUserByUsername,
} from "../users/users.service";
import { AppError } from "../../utils/AppError";
import { Argon2id } from "oslo/password";
import { excludeFields } from "../../utils/excludeFields";

export const getAuthenticatedUser = async (id: string) => {
  const user = await getUserById(id, false);
  if (!user) throw new AppError(404, "User not found");

  return user;
};

export const signUpUser = async (payload: InferInsertModel<typeof users>) => {
  const usernameExists = await getUserByUsername(payload.username);
  if (usernameExists) throw new AppError(400, "Username is already taken");

  const emailExists = await getUserByEmail(payload.email);
  if (emailExists) throw new AppError(400, "Email is already taken");

  const createdUser = await createUser(payload);
  if (!createdUser) throw new AppError(400, "create user failed");

  return excludeFields(createdUser, ["password"]);
};

export const loginUser = async (
  payload: Pick<InferInsertModel<typeof users>, "username" | "password">
) => {
  const user = await getUserByUsername(payload.username);

  if (!user) throw new AppError(404, "Invalid username/password");

  const verifiedPassword = await new Argon2id().verify(
    user.password,
    payload.password
  );

  if (!verifiedPassword) throw new AppError(404, "Invalid username/password");

  return excludeFields(user, ["password"]);
};
