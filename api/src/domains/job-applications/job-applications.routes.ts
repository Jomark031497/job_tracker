import { Router } from "express";
import { requireAuth } from "../../middlewares/requireAuth.js";
import {
  createJobApplicationHandler,
  deleteJobApplicationHandler,
  getAllUserJobApplicationsHandler,
  getSingleJobApplicationByIdHandler,
  getUserJobApplicationsOverviewHandler,
  updateJobApplicationHandler,
} from "./job-applications.controller.js";
import { validateSchema } from "../../middlewares/validateSchema.js";
import { insertJobApplicationsSchema } from "./job-applications.schema.js";

export const jobApplicationsRouter = Router();

// get single job application
jobApplicationsRouter.get("/:id", requireAuth, getSingleJobApplicationByIdHandler);

// get all job applications of a user
jobApplicationsRouter.get("/user/:userId", requireAuth, getAllUserJobApplicationsHandler);

// get job applications overview of a user
jobApplicationsRouter.get("/user/:userId/overview", requireAuth, getUserJobApplicationsOverviewHandler);

// create a job application
jobApplicationsRouter.post("/", requireAuth, validateSchema(insertJobApplicationsSchema), createJobApplicationHandler);

// update a job application
jobApplicationsRouter.patch("/:id", requireAuth, updateJobApplicationHandler);

// delete a job application
jobApplicationsRouter.delete("/:id", requireAuth, deleteJobApplicationHandler);
