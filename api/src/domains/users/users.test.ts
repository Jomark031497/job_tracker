import { describe, it, before } from "node:test";
import { createApp } from "../../app";
import supertest from "supertest";
import assert from "node:assert";
import { faker } from "@faker-js/faker";
import { db } from "../../db/dbInstance";
import { users } from "./users.schema";

describe("users routes", () => {
  const app = createApp();
  const request = supertest(app);

  const userData = {
    username: faker.person.firstName(),
    email: faker.internet.email(),
    password: faker.word.adjective(6),
    fullName: faker.person.fullName(),
  };

  before(async () => {
    await db.delete(users);
  });

  describe("POST /api/users", () => {
    it("should return validation errors with invalid data", async () => {
      const response = await request.post("/api/users").send({
        username: "",
      });

      assert.strictEqual(response.status, 400);
    });

    it("should create a user with valid data", async () => {
      const response = await request.post("/api/users").send(userData);

      assert.strictEqual(response.status, 200);
    });

    it("should return an error when creating a user with duplicate email", async () => {
      const response = await request.post("/api/users").send({
        username: faker.person.firstName(),
        email: userData.email,
        password: faker.word.adjective(6),
      });

      assert.strictEqual(response.status, 400);
    });

    it("should return an error when creating a user with duplicate username", async () => {
      const response = await request.post("/api/users").send({
        username: userData.username,
        email: faker.internet.email(),
        password: faker.word.adjective(6),
      });

      assert.strictEqual(response.status, 400);
    });
  });
});
