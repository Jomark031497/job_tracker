import { Request, Response, NextFunction } from "express";
import {
  createJobApplication,
  deleteJobApplicationById,
  getJobApplicationById,
  getJobApplications,
  getJobApplicationsByUser,
  getUserJobApplicationById,
  getUserJobApplicationsOverview,
  updateJobApplication,
} from "./job-applications.service";
import { AppError } from "../../utils/AppError";

export const getJobApplicationsHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getJobApplications(req.query);

    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};

export const getJobApplicationsByUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (res.locals.user?.id !== req.params.id) throw new AppError(403, "Forbidden");
    const data = await getJobApplicationsByUser(<string>req.params.id, req.query);

    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};

export const getUserJobApplicationsOverviewHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (res.locals.user?.id !== req.params.id) throw new AppError(403, "Forbidden");
    const data = await getUserJobApplicationsOverview(<string>req.params.id);

    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};

export const getJobApplicationByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getJobApplicationById(<string>req.params.id);

    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};

export const getUserJobApplicationByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!res.locals.user?.id) throw new AppError(403, "Forbidden");

    const data = await getUserJobApplicationById(<string>req.params.id, res.locals.user.id);

    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};

export const createJobApplicationHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await createJobApplication(req.body);

    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};

export const updateJobApplicationHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await updateJobApplication(<string>req.params.id, req.body);

    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};

export const deleteJobApplicationHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await deleteJobApplicationById(<string>req.params.id);

    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};
