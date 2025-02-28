import { Router } from "express";
import { CodingQuestionController } from "../controllers/coding-question";
import { validateCodingQuestion } from "../middlewares/validators/coding-question";


export const router = Router();

router.post("/", validateCodingQuestion , CodingQuestionController.createCodingQuestion); // Create a new drive
router.put("/:id", validateCodingQuestion, CodingQuestionController.updateCodingQuestion); // Update an existing drive
router.delete("/:id", CodingQuestionController.deleteCodingQuestion); // Delete a drive
router.get("/", CodingQuestionController.getCodingQuestions); // Get all drives
router.get("/:id", CodingQuestionController.getCodingQuestionById);