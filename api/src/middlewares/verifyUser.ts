import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";

export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  if (!res.locals.user) {
    return next(new AppError(401, "Unauthorized"));
  }

  if (res.locals.user.id !== req.params.id) {
    return next(new AppError(403, "Forbidden"));
  }

  next();
};
