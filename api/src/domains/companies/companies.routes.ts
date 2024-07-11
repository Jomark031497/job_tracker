import { Router } from "express";
import { requireAuth } from "../../middlewares/requireAuth";
import {
  createCompanyHandler,
  getCompaniesHandler,
  getCompanyByIdHandler,
} from "./companies.controller";
import { validateSchema } from "../../middlewares/validateSchema";
import { insertCompanySchema } from "./companies.schema";

const router = Router();

router.get("/", requireAuth, getCompaniesHandler);
router.get("/:id", requireAuth, getCompanyByIdHandler);

router.post("/", requireAuth, validateSchema(insertCompanySchema), createCompanyHandler);

export default router;
