import { Router } from "express";
import { authenticatedUserHandler, loginUserHandler, logoutUserHandler, signUpUserHandler } from "./auth.controller.js";
import { validateSchema } from "../../middlewares/validateSchema.js";
import { insertUserSchema, selectUserSchema } from "../users/users.schema.js";
import { authenticatedUser } from "../../middlewares/requireAuth.js";

export const authRouter = Router();

authRouter.get("/user", authenticatedUser, authenticatedUserHandler);

authRouter.post("/sign-up", validateSchema(insertUserSchema), signUpUserHandler);

authRouter.post(
  "/login",
  validateSchema(
    selectUserSchema.pick({
      username: true,
      password: true,
    }),
  ),
  loginUserHandler,
);

authRouter.delete("/logout", authenticatedUser, logoutUserHandler);
