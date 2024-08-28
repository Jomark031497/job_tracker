import { createApp } from "./app";
import { after, describe, it } from "node:test";
import assert from "node:assert";
import { env } from "./env";

describe("app initialization", () => {
  const app = createApp();
  const server = app.listen(0);

  after(() => {
    server.close();
  });

  it("should respond with 200 status on GET /healthcheck", async () => {
    const response = await fetch(`${env.BASE_URL}/healthcheck`, {
      method: "GET",
    });

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.statusText, "OK");
  });
});
