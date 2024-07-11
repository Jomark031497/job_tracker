import { Router } from "express";
import { requireAuth } from "../../middlewares/requireAuth";
import {
  createApplicationHandler,
  getApplicationsByUserHandler,
  getApplicationsHandler,
} from "./applications.controller";
import { validateSchema } from "../../middlewares/validateSchema";
import { insertApplicationsSchema } from "./applications.schema";
import { requireAdmin } from "../../middlewares/requireAdmin";

const router = Router();

router.get("/", requireAuth, requireAdmin, getApplicationsHandler);

router.get("/user/:id", requireAuth, getApplicationsByUserHandler);

router.post("/", requireAuth, validateSchema(insertApplicationsSchema), createApplicationHandler);

export default router;
