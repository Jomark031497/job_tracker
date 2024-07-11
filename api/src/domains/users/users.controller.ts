import { Request, Response, NextFunction } from "express";
import { createUser, deleteUser, getUsers, updateUser } from "./users.service";
import { AppError } from "../../utils/AppError";

export const getUsersHandler = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getUsers();

    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};

export const createUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await createUser(req.body);

    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};

export const updateUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (res.locals.user?.id !== req.params.id) throw new AppError(403, "Forbidden");

    const data = await updateUser(<string>req.params.id, req.body);

    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};

export const deleteUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (res.locals.user?.id !== req.params.id) throw new AppError(403, "Forbidden");

    const data = await deleteUser(<string>req.params.id);
    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};
