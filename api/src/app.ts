import express from "express";
import { logger } from "./lib/logger";

async function main() {
  const app = express();
  const port = process.env.PORT;

  app.listen(port, () => {
    logger.info(`Server running at http://localhost:${port}`);
  });
}

main().catch((err) => {
  console.log(err);
});
