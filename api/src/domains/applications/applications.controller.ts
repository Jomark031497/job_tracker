import { Request, Response, NextFunction } from "express";
import {
  createApplication,
  deleteApplicationById,
  getApplications,
  getApplicationsByUser,
  getUserApplicationsOverview,
  updateApplication,
} from "./applications.service";
import { AppError } from "../../utils/AppError";

export const getApplicationsHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getApplications(req.query);

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
    const data = await getApplicationsByUser(<string>req.params.id, req.query);

    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};

export const getUserApplicationsOverviewHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (res.locals.user?.id !== req.params.id) throw new AppError(403, "Forbidden");
    const data = await getUserApplicationsOverview(<string>req.params.id);

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

export const updateApplicationHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await updateApplication(<string>req.params.id, req.body);

    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};

export const deleteApplicationHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await deleteApplicationById(<string>req.params.id);

    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};
