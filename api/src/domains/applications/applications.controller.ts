import { Request, Response, NextFunction } from "express";
import { createApplication, getApplications, getApplicationsByUser } from "./applications.service";
import { AppError } from "../../utils/AppError";

export const getApplicationsHandler = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getApplications();

    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};

export const getApplicationsByUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (res.locals.user?.id !== req.params.id) throw new AppError(403, "Forbidden");

    const data = await getApplicationsByUser(<string>req.params.id);

    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};

export const createApplicationHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await createApplication(req.body);

    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};
