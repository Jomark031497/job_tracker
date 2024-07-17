import { Express } from "express";
import { usersRouter } from "./domains/users/users.routes";
import { authRouter } from "./domains/auth/auth.routes";
import { applicationsRouter } from "./domains/applications/applications.routes";

export const initializeRoutes = (app: Express) => {
  app.use("/api/users", usersRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/applications", applicationsRouter);
};
