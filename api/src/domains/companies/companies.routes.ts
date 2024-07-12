import { Router } from "express";
import { requireAuth } from "../../middlewares/requireAuth";
import {
  createCompanyHandler,
  getCompaniesHandler,
  getCompanyByIdHandler,
} from "./companies.controller";
import { validateSchema } from "../../middlewares/validateSchema";
import { insertCompanySchema } from "./companies.schema";

export const companiesRouter = Router();

companiesRouter.get("/", requireAuth, getCompaniesHandler);
companiesRouter.get("/:id", requireAuth, getCompanyByIdHandler);

companiesRouter.post("/", requireAuth, validateSchema(insertCompanySchema), createCompanyHandler);
