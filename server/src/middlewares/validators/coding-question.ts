import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { DifficultyLevel } from "../../models/coding-question";

export const validateCodingQuestion = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("input_format")
    .trim()
    .notEmpty()
    .withMessage("Input format is required"),
  body("output_format")
    .trim()
    .notEmpty()
    .withMessage("Output format is required"),
  body("time_limit_milliseconds")
    .isInt({ min: 1 })
    .withMessage("Time limit must be a positive integer"),
  body("difficulty_level")
    .optional()
    .isIn(Object.values(DifficultyLevel))
    .withMessage(
      `Difficulty level must be one of: ${Object.values(DifficultyLevel).join(
        ", "
      )}`
    ),
  body("constraints").trim().notEmpty().withMessage("Constraints are required"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
];
