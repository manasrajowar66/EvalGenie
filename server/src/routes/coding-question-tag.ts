import { Router } from "express";
import { validateCodingQuestionTag } from "../middlewares/validators/coding-question-tag";
import { CodingQuestionTagController } from "../controllers/coding-question-tag";


export const router = Router();

router.post("/:codingQuestionId", validateCodingQuestionTag, CodingQuestionTagController.addCodingQuestionTag);
router.delete("/:id", CodingQuestionTagController.deleteCodingQuestionTag);