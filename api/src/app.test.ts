import { describe, it } from "node:test";
import { createApp } from "./app";
import supertest from "supertest";
import assert from "node:assert";

describe("testing the app", () => {
  const app = createApp();
  const request = supertest(app);

  it("GET /healthcheck should return a 200", async () => {
    const response = await request.get("/healthcheck");
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.text, "OK");
  });

  it("GET /api/auth/user should return 401 if unauthenticated", async () => {
    const response = await request.get("/api/auth/user");

    assert.strictEqual(response.status, 401);
  });
});
