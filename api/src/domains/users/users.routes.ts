import { Router } from "express";
import * as controller from "./users.controller.js";
import { validateSchema } from "../../middlewares/validateSchema.js";
import { insertUserSchema } from "./users.schema.js";
import { requireAuth } from "../../middlewares/requireAuth.js";

export const usersRouter = Router();

usersRouter.get("/", requireAuth, controller.getUsersHandler);

usersRouter.post("/", validateSchema(insertUserSchema), controller.createUserHandler);

usersRouter.patch("/:id", requireAuth, controller.updateUserHandler);

usersRouter.delete("/:id", requireAuth, controller.deleteUserHandler);
