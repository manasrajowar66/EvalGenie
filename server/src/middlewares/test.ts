// middleware/checkTestExpiration.js
import { Request, Response, NextFunction } from 'express';
import Test from '../models/test';

export const checkTestExpiration = async (req: Request, res: Response, next: NextFunction) => {
  const { testId } = req.params;  // Assuming the test ID is passed as a parameter

  try {
    const test = await Test.findByPk(testId);
    if (!test) {
      res.status(404).json({ message: 'Test not found' });
      return;
    }

    // Compare current date and time with the test end time
    const currentTime = new Date();
    const endTime = new Date(test.end_date); // End time of the test

    if (currentTime > endTime) {
      res.status(400).json({ message: 'Test time has expired. You can no longer take the test.' });
      return;
    }

    next();  // Proceed if the test has not expired
  } catch (error) {
    res.status(500).json({ message: 'Error checking test expiration', error });
  }
};
