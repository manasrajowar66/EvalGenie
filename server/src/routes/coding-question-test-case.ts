import { Router } from "express";
import { validateTestCase } from "../middlewares/validators/coding-question-test-case";
import { CodingTestCaseController } from "../controllers/coding-question-test-case";

export const router = Router();

router.post("/:codingQuestionId", validateTestCase, CodingTestCaseController.addTestCase);
router.delete("/:codingQuestionId", CodingTestCaseController.deleteTestCase);
router.put("/:codingQuestionId", validateTestCase, CodingTestCaseController.updateTestCase);