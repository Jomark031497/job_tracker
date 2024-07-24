import { Router } from "express";
import { requireAuth } from "../../middlewares/requireAuth.js";
import {
  createJobApplicationHandler,
  deleteJobApplicationHandler,
  getJobApplicationsByUserHandler,
  getJobApplicationsHandler,
  getJobApplicationByIdHandler,
  getUserJobApplicationsOverviewHandler,
  updateJobApplicationHandler,
} from "./job-applications.controller";
import { validateSchema } from "../../middlewares/validateSchema";
import { insertJobApplicationsSchema } from "./job-applications.schema";
import { verifyUser } from "../../middlewares/verifyUser";

export const jobApplicationsRouter = Router();

jobApplicationsRouter.get("/", requireAuth, getJobApplicationsHandler);
jobApplicationsRouter.get("/:id", requireAuth, getJobApplicationByIdHandler);

jobApplicationsRouter.get("/user/:id", requireAuth, verifyUser, getJobApplicationsByUserHandler);

jobApplicationsRouter.get(
  "/user/overview/:id",
  requireAuth,
  verifyUser,
  getUserJobApplicationsOverviewHandler
);

jobApplicationsRouter.post(
  "/",
  requireAuth,
  validateSchema(insertJobApplicationsSchema),
  createJobApplicationHandler
);

jobApplicationsRouter.patch("/:id", requireAuth, verifyUser, updateJobApplicationHandler);

jobApplicationsRouter.delete("/:id", requireAuth, deleteJobApplicationHandler);
