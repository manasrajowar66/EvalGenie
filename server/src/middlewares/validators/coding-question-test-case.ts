import { Request, Response, NextFunction } from "express";
import { body, param, validationResult } from "express-validator";

export const validateTestCase = [
  // Validate `codingQuestionId` as a valid UUID
  param("codingQuestionId")
    .isUUID()
    .withMessage("Invalid codingQuestionId format."),

  // Validate `input` field (required)
  body("input")
    .isString()
    .withMessage("Input must be a string.")
    .notEmpty()
    .withMessage("Input cannot be empty."),

  // Validate `expected_output` field (required)
  body("expected_output")
    .isString()
    .withMessage("Expected output must be a string.")
    .notEmpty()
    .withMessage("Expected output cannot be empty."),

  // Validate `is_sample` (optional but must be a boolean if provided)
  body("is_sample")
    .optional()
    .isBoolean()
    .withMessage("is_sample must be a boolean value."),

  // Handle validation errors
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
];
