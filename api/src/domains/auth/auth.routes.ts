import { Router } from "express";
import { authenticatedUserHandler, loginUserHandler, logoutUserHandler, signUpUserHandler } from "./auth.controller";
import { validateSchema } from "../../middlewares/validateSchema";
import { insertUserSchema, selectUserSchema } from "../users/users.schema";
import { authenticatedUser } from "../../middlewares/requireAuth";

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
