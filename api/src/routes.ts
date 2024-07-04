import { Express } from "express";
import authRoutes from "./domains/auth/auth.routes";

export const initializeRoutes = (app: Express) => {
  app.use("/api/auth", authRoutes);
};
