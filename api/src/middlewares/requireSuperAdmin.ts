import { Request, Response, NextFunction } from "express";

export const requireSuperAdmin = async (_req: Request, res: Response, next: NextFunction) => {
  if (res.locals.user?.role !== "superadmin") return res.status(403).end();

  return next();
};
