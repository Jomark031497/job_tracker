import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { logger } from "../lib/logger";

export const errorHandler = (error: AppError | Error, _req: Request, res: Response, next: NextFunction) => {
  if (!error) next();

  logger.error(error);

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  return res.status(500).json({ message: "Something went wrong" });
};
