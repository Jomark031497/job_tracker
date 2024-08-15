import { Router } from "express";
import * as controller from "./users.controller.js";
import { validateSchema } from "../../middlewares/validateSchema.js";
import { insertUserSchema } from "./users.schema.js";
import { authenticatedUser } from "../../middlewares/requireAuth.js";
import { requireSuperAdmin } from "../../middlewares/requireSuperAdmin.js";

export const usersRouter = Router();

usersRouter.get("/", authenticatedUser, requireSuperAdmin, controller.getUsersHandler);

usersRouter.post("/", validateSchema(insertUserSchema), controller.createUserHandler);

usersRouter.patch("/:id", authenticatedUser, controller.updateUserHandler);

usersRouter.delete("/:id", authenticatedUser, controller.deleteUserHandler);
