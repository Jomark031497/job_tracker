import { after, before, describe, it } from "node:test";
import assert from "node:assert";
import { createApp } from "../../app";
import { faker } from "@faker-js/faker";
import { closeDbConnection, db } from "../../db/dbInstance";
import { User, users } from "./users.schema";
import { logger } from "../../lib/logger";

type ResponseError = {
  message: string;
  errors?: User;
};

describe("users", () => {
  const app = createApp();
  let baseUrl = ``;

  const server = app.listen(0); // Listen on an available port

  const userData = {
    username: faker.person.firstName(),
    email: faker.internet.email(),
    password: faker.word.adjective(6),
    fullName: faker.person.fullName(),
  };

  before(async () => {
    const address = server.address();
    if (typeof address === "string") {
      logger.info(`Server listening on ${address}`); // Handle string case (rare)
    } else {
      const port = address?.port;
      baseUrl = `http://localhost:${port}`;
      logger.info(baseUrl);
      logger.info(`Server listening on port ${port}`);
    }

    await db.delete(users);
  });

  after(async () => {
    await db.delete(users);
    await closeDbConnection();
    server.close((err) => {
      if (err) throw err;
      logger.info("server closed");
    });
  });

  describe("POST /api/users", () => {
    const url = new URL("/api/users", baseUrl);

    it("should return validation errors with invalid data", async () => {
      const response = await fetch(url, {
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
      const response = await fetch(url, {
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

    it("should return an error when creating a user with duplicate email", async () => {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          username: faker.internet.userName(),
          email: userData.email,
          password: faker.word.adjective(6),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = (await response.json()) as ResponseError;

      assert.strictEqual(response.status, 400);
      assert.strictEqual(data.errors?.email, "email is already taken");
    });

    it("should return an error when creating a user with duplicate username", async () => {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          username: userData.username,
          email: faker.internet.email(),
          password: faker.word.adjective(6),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = (await response.json()) as ResponseError;

      assert.strictEqual(response.status, 400);
      assert.strictEqual(data.errors?.username, "username is already taken");
    });

    it("should return an error when creating a user with an invalid email format", async () => {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          username: faker.internet.userName(),
          email: "invalid-email",
          password: faker.word.adjective(6),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = (await response.json()) as ResponseError;

      assert.strictEqual(response.status, 400);
      assert.strictEqual(data.errors?.email, "Please enter a valid email address");
    });

    it("should return an error when creating a user with a short password", async () => {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          username: faker.internet.userName(),
          email: faker.internet.email(),
          password: faker.word.adjective(3),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = (await response.json()) as ResponseError;

      assert.strictEqual(response.status, 400);
      assert.strictEqual(data.errors?.password, "Password must be at least 6 characters long");
    });
  });
});
