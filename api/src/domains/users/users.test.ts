import { after, before, describe, it } from "node:test";
import assert from "node:assert";
import { createApp } from "../../app";
import { faker } from "@faker-js/faker";
import { logger } from "../../lib/logger";
import { env } from "../../env";
import { closeDbConnection, db } from "../../db/dbInstance";
import { User, users } from "./users.schema";

type ResponseError = {
  message: string;
  errors?: User;
};

describe("users", () => {
  const app = createApp();
  const server = app.listen(0); // Listen on an available port

  const userData = {
    username: faker.person.firstName(),
    email: faker.internet.email(),
    password: faker.word.adjective(6),
    fullName: faker.person.fullName(),
  };

  before(async () => {
    await db.delete(users);
  });

  after(async () => {
    await db.delete(users);
    await closeDbConnection();
    server.close();
  });

  describe("POST /api/users", () => {
    it("should return validation errors with invalid data", async () => {
      const response = await fetch(`${env.BASE_URL}/api/users`, {
        method: "POST",
        body: JSON.stringify({ username: "", email: "", password: "" }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = (await response.json()) as ResponseError;

      assert.strictEqual(data.message, "Validation Error");
      assert.strictEqual(response.status, 400);
      assert.strictEqual(data.errors?.username, "Username must be at least 3 characters long");
      assert.strictEqual(data.errors?.email, "Please enter a valid email address");
      assert.strictEqual(data.errors?.password, "Password must be at least 6 characters long");
    });

    it("should create a user with valid data", async () => {
      const response = await fetch(`${env.BASE_URL}/api/users`, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = (await response.json()) as User;

      assert.strictEqual(response.status, 200);
      assert.strictEqual(data.username, userData.username);
      assert.strictEqual(data.email, userData.email);
    });
  });
});
