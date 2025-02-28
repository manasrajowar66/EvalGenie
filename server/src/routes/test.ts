// routes/testRoutes.js
import express from 'express';
import { TestController } from '../controllers/test';
import { checkTestExpiration } from '../middlewares/test';
import { validateCreateTest, validateUpdateTest } from '../middlewares/validators/test';

export const router = express.Router();

// Create a new test for a recruitment drive
router.post('/', validateCreateTest, TestController.createTest);

// Get all tests for a specific recruitment drive
router.get('/:recruitmentDriveId', TestController.getTestsByRecruitmentDrive);

// Update a test by ID
router.put('/:id', validateUpdateTest, TestController.updateTest);

// Delete a test by ID
router.delete('/:id', TestController.deleteTest);

// Route for starting a test (ensure the test hasn't expired)
router.post('/start/:testId', checkTestExpiration);

// Other routes for test submission, etc.
router.post('/submit/:testId', checkTestExpiration);