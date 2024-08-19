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
        email: "",
        password: "",
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
      assert.strictEqual(response.body.errors.email, "email is already taken");
    });

    it("should return an error when creating a user with duplicate username", async () => {
      const response = await request.post("/api/users").send({
        username: userData.username,
        email: faker.internet.email(),
        password: faker.word.adjective(6),
      });

      assert.strictEqual(response.status, 400);
      assert.strictEqual(response.body.errors.username, "username is already taken");
    });

    it("should return an error when creating a user without required fields", async () => {
      const response = await request.post("/api/users").send({
        username: "",
        email: "",
        password: "",
      });

      assert.strictEqual(response.status, 400);
      assert.strictEqual(response.body.errors.username, "Username must be at least 3 characters long");
      assert.strictEqual(response.body.errors.email, "Please enter a valid email address");
      assert.strictEqual(response.body.errors.password, "Password must be at least 6 characters long");
    });

    it("should return an error when creating a user with an invalid email format", async () => {
      const response = await request.post("/api/users").send({
        username: faker.person.firstName(),
        email: "invalid-email",
        password: faker.word.adjective(6),
        fullName: faker.person.fullName(),
      });

      assert.strictEqual(response.status, 400);
      assert.strictEqual(response.body.errors.email, "Please enter a valid email address");
    });

    it("should return an error when creating a user with a short password", async () => {
      const response = await request.post("/api/users").send({
        username: faker.person.firstName(),
        email: faker.internet.email(),
        password: "123",
        fullName: faker.person.fullName(),
      });

      assert.strictEqual(response.status, 400);
      assert.strictEqual(response.body.errors.password, "Password must be at least 6 characters long");
    });

    it("should create a user without a full name", async () => {
      const response = await request.post("/api/users").send({
        username: faker.person.firstName(),
        email: faker.internet.email(),
        password: faker.word.adjective(6),
      });

      assert.strictEqual(response.status, 200);
      assert.strictEqual(response.body.fullName, null); // Assuming fullName is optional
    });
  });
});
