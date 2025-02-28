import { Router } from "express";
import { BaseFunctionController } from "../controllers/base-function";

export const router = Router();

router.get("/:codingQuestionId", BaseFunctionController.generateBaseFunctions);