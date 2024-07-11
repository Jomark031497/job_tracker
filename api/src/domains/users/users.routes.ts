import { Router } from "express";
import * as controller from "./users.controller";
import { validateSchema } from "../../middlewares/validateSchema";
import { insertUserSchema } from "./users.schema";
import { requireAuth } from "../../middlewares/requireAuth";
import { requireSuperAdmin } from "../../middlewares/requireSuperAdmin";

export const usersRouter = Router();

usersRouter.get("/", requireSuperAdmin, requireAuth, controller.getUsersHandler);

usersRouter.post("/", validateSchema(insertUserSchema), controller.createUserHandler);

usersRouter.patch("/:id", requireAuth, controller.updateUserHandler);

usersRouter.delete("/:id", requireAuth, controller.deleteUserHandler);
