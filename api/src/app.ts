import express from "express";
import { logger } from "./lib/logger";
import cors from "cors";
import { initializeRoutes } from "./routes";
import { errorHandler } from "./middlewares/errorHandler";

async function main() {
  const app = express();
  const port = process.env.PORT;

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
    }),
  );

  initializeRoutes(app);

  app.use(errorHandler);

  app.listen(port, () => {
    logger.info(`Server running at http://localhost:${port}`);
  });
}

main().catch((err) => {
  logger.error(err);
});
