import cors from "cors";
import express from "express";
import { env } from "./env.js";
import { logger } from "./lib/logger.js";
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

async function main() {
  const app = createApp();
  const port = env.PORT;

  const server = app.listen(port, () => {
    logger.info(`Server running at http://localhost:${port}`);
  });

  // Graceful shutdown
  function shutdown(signal: string) {
    logger.info(`${signal} signal received: closing HTTP server`);
    server.close(() => {
      logger.info("HTTP server closed");
      // Perform any other cleanup tasks here (e.g., database connection closing)
      process.exit(0);
    });
  }

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
}

main().catch((err) => {
  logger.error(err);
});
