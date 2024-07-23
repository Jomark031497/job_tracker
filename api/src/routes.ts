import { Express } from "express";
import { usersRouter } from "./domains/users/users.routes.js";
import { authRouter } from "./domains/auth/auth.routes.js";
import { applicationsRouter } from "./domains/applications/applications.routes.js";

export const initializeRoutes = (app: Express) => {
  app.use("/api/users", usersRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/applications", applicationsRouter);
};
