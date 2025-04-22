import { Router } from "express";
import { validateTestCase } from "../middlewares/validators/coding-question-test-case";
import { CodingTestCaseController } from "../controllers/coding-question-test-case";

export const router = Router();

router.post("/:codingQuestionId", validateTestCase, CodingTestCaseController.addTestCase);
router.delete("/:id", CodingTestCaseController.deleteTestCase);
router.put("/:id", validateTestCase, CodingTestCaseController.updateTestCase);