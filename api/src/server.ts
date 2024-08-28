import { createApp } from "./app";
import { closeDbConnection } from "./db/dbInstance";
import { env } from "./env";
import { logger } from "./lib/logger";

async function main() {
  const port = env.PORT;
  const app = createApp();

  const server = app.listen(port, () => {
    logger.info(`Server running at http://localhost:${port}`);
  });

  // Graceful shutdown
  function shutdown(signal: string) {
    logger.info(`${signal} signal received: closing HTTP server`);
    server.close(() => {
      closeDbConnection();
      logger.info("HTTP server closed");
      process.exit(0);
    });
  }

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
}

main().catch((err) => {
  logger.error(err);
});
