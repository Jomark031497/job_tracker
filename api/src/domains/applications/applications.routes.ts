import { Router } from "express";
import { validateSession } from "../../middlewares/validateSession";
import {
  createApplicationHandler,
  getApplicationsByUserHandler,
  getApplicationsHandler,
} from "./applications.controller";
import { validateSchema } from "../../middlewares/validateSchema";
import { insertApplicationsSchema } from "./applications.schema";

const router = Router();

router.get("/", validateSession, getApplicationsHandler);

router.get("/user/:id", validateSession, getApplicationsByUserHandler);

router.post(
  "/",
  validateSession,
  validateSchema(insertApplicationsSchema),
  createApplicationHandler
);

export default router;
