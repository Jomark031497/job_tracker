import cors from "cors";
import express from "express";
import { env } from "./env.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { initializeRoutes } from "./routes.js";

export function createApp() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(
    cors({
      origin: env.CLIENT_URL,
      credentials: true,
    }),
  );

  initializeRoutes(app);

  app.use(errorHandler);
  return app;
}
