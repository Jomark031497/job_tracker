import { Router } from "express";
import { requireAuth } from "../../middlewares/requireAuth";
import {
  createApplicationHandler,
  getApplicationsByUserHandler,
  getApplicationsHandler,
} from "./applications.controller";
import { validateSchema } from "../../middlewares/validateSchema";
import { insertApplicationsSchema } from "./applications.schema";
import { requireSuperAdmin } from "../../middlewares/requireSuperAdmin";
import { verifyUser } from "../../middlewares/verifyUser";

export const applicationsRouter = Router();

applicationsRouter.get("/", requireAuth, requireSuperAdmin, getApplicationsHandler);

applicationsRouter.get("/user/:id", requireAuth, verifyUser, getApplicationsByUserHandler);

applicationsRouter.post(
  "/",
  requireAuth,
  validateSchema(insertApplicationsSchema),
  createApplicationHandler
);
