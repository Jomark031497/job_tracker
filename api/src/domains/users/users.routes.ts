import { Router } from "express";
import * as controller from "./users.controller.js";
import { validateSchema } from "../../middlewares/validateSchema.js";
import { insertUserSchema } from "./users.schema.js";
import { requireAuth } from "../../middlewares/requireAuth.js";
import { requireSuperAdmin } from "../../middlewares/requireSuperAdmin.js";
import { verifyUser } from "../../middlewares/verifyUser.js";

export const usersRouter = Router();

usersRouter.get("/", requireAuth, requireSuperAdmin, controller.getUsersHandler);

usersRouter.post("/", validateSchema(insertUserSchema), controller.createUserHandler);

usersRouter.patch("/:id", requireAuth, verifyUser, controller.updateUserHandler);

usersRouter.delete("/:id", requireAuth, verifyUser, controller.deleteUserHandler);
