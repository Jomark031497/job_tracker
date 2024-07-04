import { Router } from "express";
import {
  authenticatedUserHandler,
  loginUserHandler,
  logoutUserHandler,
  signUpUserHandler,
} from "./auth.controller";
import { validateSchema } from "../../middlewares/validateSchema";
import { insertUserSchema, selectUserSchema } from "../users/users.schema";
import { validateSession } from "../../middlewares/validateSession";

const router = Router();

router.get("/user", validateSession, authenticatedUserHandler);

router.post("/sign-up", validateSchema(insertUserSchema), signUpUserHandler);

router.post(
  "/login",
  validateSchema(
    selectUserSchema.pick({
      username: true,
      password: true,
    })
  ),
  loginUserHandler
);

router.delete("/logout", validateSession, logoutUserHandler);

export default router;
