import { Request, Response, NextFunction } from "express";
import { body, param, validationResult } from "express-validator";

export const validateCodingQuestionTag = [
  param("codingQuestionId")
    .isUUID()
    .withMessage("Invalid codingQuestionId format."),
  body("tags")
    .isArray({ min: 1 })
    .withMessage("Tags must be a non-empty array.")
    .custom((tags: string[]) => {
      if (
        !tags.every(
          (tagId) =>
            typeof tagId === "string" && tagId.match(/^[0-9a-fA-F-]{36}$/)
        )
      ) {
        throw new Error("All tags must be valid UUIDs.");
      }
      return true;
    }),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
];
