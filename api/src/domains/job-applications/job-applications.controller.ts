import { Request, Response, NextFunction } from "express";
import {
  createJobApplication,
  deleteJobApplicationById,
  getJobApplicationById,
  getJobApplications,
  getUserJobApplications,
  getUserJobApplicationById,
  getUserJobApplicationsOverview,
  updateJobApplication,
} from "./job-applications.service.js";
import { AppError } from "../../utils/AppError.js";

export const getAllJobApplicationsHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getJobApplications(req.query);
    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};

export const getAllUserJobApplicationsHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getUserJobApplications(<string>req.params.userId, req.query);
    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};

export const getUserJobApplicationsOverviewHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getUserJobApplicationsOverview(<string>req.params.userId);
    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};

export const getSingleJobApplicationByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getJobApplicationById(<string>req.params.id);
    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};

export const getSingleUserJobApplicationByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.userId;
    if (!userId) throw new AppError(403, "Forbidden");
    const data = await getUserJobApplicationById(<string>req.params.id, userId);
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
    const id = req.params.id;
    const userId = res.locals.user?.id;
    if (!userId) throw new AppError(403, "Forbidden");
    const data = await updateJobApplication(<string>id, userId, req.body);
    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};

export const deleteJobApplicationHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const userId = res.locals.user?.id;
    if (!userId) throw new AppError(403, "Forbidden");
    const data = await deleteJobApplicationById(<string>id, userId);
    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};
