import { Router } from "express";
import { authenticatedUser } from "../../middlewares/requireAuth.js";
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
import { requireAdmin } from "../../middlewares/requireAdmin.js";

export const jobApplicationsRouter = Router();

// get all job applications (admin only)
jobApplicationsRouter.get("/", authenticatedUser, requireAdmin, getJobApplicationsHandler);

// get single job application
jobApplicationsRouter.get("/:id", authenticatedUser, getJobApplicationByIdHandler);

// get a single job application of a user
jobApplicationsRouter.get("/user/:userId/:id");

// get all job applications of a user
jobApplicationsRouter.get("/user/:userId", authenticatedUser, getJobApplicationsByUserHandler);

// get job applications overview of a user
jobApplicationsRouter.get("/user/:userId/overview", authenticatedUser, getUserJobApplicationsOverviewHandler);

// create a job application
jobApplicationsRouter.post(
  "/",
  authenticatedUser,
  validateSchema(insertJobApplicationsSchema),
  createJobApplicationHandler,
);

// update a job application
jobApplicationsRouter.patch("/:id", authenticatedUser, updateJobApplicationHandler);

// delete a job application
jobApplicationsRouter.delete("/:id", authenticatedUser, deleteJobApplicationHandler);
