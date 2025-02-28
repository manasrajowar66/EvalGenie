import { Request, Response, NextFunction } from "express";
import { body, validationResult, param } from "express-validator";

export const validateCreateTest = [
  body("name").isString().notEmpty().withMessage("Test name is required"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  body("date").isISO8601().withMessage("Invalid date format"),
  body("end_time").isISO8601().withMessage("Invalid end time format"),
  body("duration")
    .isInt({ min: 1 })
    .withMessage("Duration must be a positive integer (in minutes)"),
  body("recruitment_drive_id")
    .isUUID()
    .withMessage("Invalid recruitment drive ID"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
];

export const validateUpdateTest = [
    param('id').isUUID().withMessage('Invalid test ID'),
    body('name').optional().isString().withMessage('Test name must be a string'),
    body('description').optional().isString().withMessage('Description must be a string'),
    body('date').optional().isISO8601().withMessage('Invalid date format'),
    body('end_time').optional().isISO8601().withMessage('Invalid end time format'),
    body('duration').optional().isInt({ min: 1 }).withMessage('Duration must be a positive integer (in minutes)'),
  
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }
      next();
    },
  ];
