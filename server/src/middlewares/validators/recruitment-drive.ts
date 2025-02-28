import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const validateRecruitmentDrive = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("instituteName")
    .trim()
    .notEmpty()
    .withMessage("Institute name is required"),
  body("session")
    .optional()
    .matches(/^\d{4} - \d{4}$/)
    .withMessage("Session must be in format YYYY - YYYY"),
  body("status")
    .optional()
    .isIn(["inprogress", "completed"])
    .withMessage("Status must be either 'inprogress' or 'completed'"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
];
