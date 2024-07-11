import { Request, Response, NextFunction } from "express";
import { createCompamy, getCompanies, getCompanyById } from "./companies.service";

export const getCompaniesHandler = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getCompanies();

    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};

export const getCompanyByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getCompanyById(<string>req.params.id);

    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};

export const createCompanyHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await createCompamy(req.body);

    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};
