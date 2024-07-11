import { Router } from "express";
import * as controller from "./users.controller";
import { validateSchema } from "../../middlewares/validateSchema";
import { insertUserSchema } from "./users.schema";
import { requireAuth } from "../../middlewares/requireAuth";
import { requireSuperAdmin } from "../../middlewares/requireSuperAdmin";
import { verifyUser } from "../../middlewares/verifyUser";

export const usersRouter = Router();

usersRouter.get("/", requireAuth, requireSuperAdmin, controller.getUsersHandler);

usersRouter.post("/", validateSchema(insertUserSchema), controller.createUserHandler);

usersRouter.patch("/:id", requireAuth, verifyUser, controller.updateUserHandler);

usersRouter.delete("/:id", requireAuth, verifyUser, controller.deleteUserHandler);
