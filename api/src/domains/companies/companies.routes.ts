import { Router } from "express";
import { validateSession } from "../../middlewares/validateSession";
import {
  createCompanyHandler,
  getCompaniesHandler,
  getCompanyByIdHandler,
} from "./companies.controller";
import { validateSchema } from "../../middlewares/validateSchema";
import { insertCompanySchema } from "./companies.schema";

const router = Router();

router.get("/", validateSession, getCompaniesHandler);
router.get("/:id", validateSession, getCompanyByIdHandler);

router.post("/", validateSession, validateSchema(insertCompanySchema), createCompanyHandler);

export default router;
