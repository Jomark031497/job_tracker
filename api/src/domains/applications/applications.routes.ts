import { Router } from "express";
import { requireAuth } from "../../middlewares/requireAuth";
import {
  createApplicationHandler,
  getApplicationsByUserHandler,
  getApplicationsHandler,
} from "./applications.controller";
import { validateSchema } from "../../middlewares/validateSchema";
import { insertApplicationsSchema } from "./applications.schema";
import { requireSuperAdmin } from "../../middlewares/requireSuperAdmin";
import { verifyUser } from "../../middlewares/verifyUser";

const router = Router();

router.get("/", requireAuth, requireSuperAdmin, getApplicationsHandler);

router.get("/user/:id", requireAuth, verifyUser, getApplicationsByUserHandler);

router.post("/", requireAuth, validateSchema(insertApplicationsSchema), createApplicationHandler);

export default router;
