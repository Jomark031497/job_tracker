import { Request, Response, NextFunction } from "express";
import { getUserById } from "../domains/users/users.service.js";

export const requireAdmin = async (_req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;

  if (!user) return res.status(403).end();

  const queriedUser = await getUserById(user.id);
  if (!queriedUser) return res.status(403).end();

  if (queriedUser.role !== "admin") return res.status(403).end();

  console.log(user);

  return next();
};
