import { Express } from "express";
import authRoutes from "./domains/auth/auth.routes";
import applicationsRoutes from "./domains/applications/applications.routes";
import companiesRoutes from "./domains/companies/companies.routes";
import { usersRouter } from "./domains/users/users.routes";

export const initializeRoutes = (app: Express) => {
  app.use("/api/users", usersRouter);
  app.use("/api/auth", authRoutes);
  app.use("/api/applications", applicationsRoutes);
  app.use("/api/companies", companiesRoutes);
};
