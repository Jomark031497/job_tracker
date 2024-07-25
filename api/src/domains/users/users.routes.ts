import { Router } from "express";
import * as controller from "./users.controller";
import { validateSchema } from "../../middlewares/validateSchema";
import { insertUserSchema } from "./users.schema";
import { authenticatedUser } from "../../middlewares/requireAuth";
import { requireSuperAdmin } from "../../middlewares/requireSuperAdmin";

export const usersRouter = Router();

usersRouter.get("/", authenticatedUser, requireSuperAdmin, controller.getUsersHandler);

usersRouter.post("/", validateSchema(insertUserSchema), controller.createUserHandler);

usersRouter.patch("/:id", authenticatedUser, controller.updateUserHandler);

usersRouter.delete("/:id", authenticatedUser, controller.deleteUserHandler);
