import { describe, it, beforeEach, afterEach, expect } from "vitest";
import supertest from "supertest";
import { createApp } from "./app";
import { env } from "./env";
import { logger } from "./lib/logger";

describe("App Initialization", () => {
  const app = createApp();
  let server = app.listen(0);
  let request = supertest(server);

  beforeEach(async () => {
    const app = createApp();
    server = app.listen(0, () => {
      logger.info(`Test server running at http://localhost:${env.PORT}`);
    });
    request = supertest(server);
  });

  afterEach(async () => {
    await new Promise<void>((resolve) => {
      server.close(() => {
        logger.info("Test server closed");
        resolve();
      });
    });
  });

  it("should respond with 200 status on GET /healthcheck", async () => {
    const response = await request.get("/healthcheck");
    expect(response.status).toBe(200);
    expect(response.text).toBe("OK"); // Adjust based on your actual route response
  });

  // Add more tests here as needed
});
