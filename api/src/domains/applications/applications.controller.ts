import { Request, Response, NextFunction } from "express";
import { createApplication, getApplications, getApplicationsByUser } from "./applications.service";

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
