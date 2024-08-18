import { Request, Response, NextFunction } from "express";
import { createUser, deleteUser, updateUser } from "./users.service.js";

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
    const data = await updateUser(<string>req.params.id, req.body);

    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};

export const deleteUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await deleteUser(<string>req.params.id);
    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};
