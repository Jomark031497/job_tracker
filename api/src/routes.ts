import { Express } from "express";
import { usersRouter } from "./domains/users/users.routes.js";
import { authRouter } from "./domains/auth/auth.routes.js";
import { jobApplicationsRouter } from "./domains/job-applications/job-applications.routes.js";

export const initializeRoutes = (app: Express) => {
  app.use("/api/users", usersRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/job-applications", jobApplicationsRouter);

  // Add additional routes or catch-all route for 404
  app.use("*", (_req, res) => {
    res.status(404).json({ error: "Not Found" });
  });
};
