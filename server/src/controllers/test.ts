// controllers/testController.js
import { Request, Response } from 'express';
import Test from '../models/test';
import RecruitmentDrive from '../models/recruitment-drive';

export class TestController {
  // Create a new test for a recruitment drive
  static async createTest(req: Request, res: Response) {
    try {
      const { name, description, date, end_time, duration, recruitment_drive_id } = req.body;

      // Check if the recruitment drive exists
      const drive = await RecruitmentDrive.findByPk(recruitment_drive_id);
      if (!drive) {
        res.status(404).json({ message: 'Recruitment drive not found!' });
        return;
      }

      // Create a new test
      const newTest = await Test.create({
        name,
        description,
        date,
        duration: duration * 60,
        recruitment_drive_id,
        end_time
      });

      res.status(201).json({ message: 'Test created successfully!', data: newTest });
    } catch (error) {
      res.status(500).json({ message: 'Error creating test', error });
    }
  }

  // Get all tests for a specific recruitment drive
  static async getTestsByRecruitmentDrive(req: Request, res: Response) {
    try {
      const { recruitmentDriveId } = req.params;

      // Find tests related to the given recruitment drive
      const tests = await Test.findAll({
        where: { recruitment_drive_id: recruitmentDriveId },
      });

      // if (tests.length === 0) {
      //   res.status(404).json({ message: 'No tests found for this recruitment drive' });
      //   return;
      // }

      res.status(200).json({ data: tests });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching tests', error });
    }
  }

  // Update a test by ID
  static async updateTest(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, description, date, end_time, duration } = req.body;

      const test = await Test.findByPk(id);
      if (!test) {
        res.status(404).json({ message: 'Test not found!' });
        return;
      }

      test.name = name || test.name;
      test.description = description || test.description;
      test.date = date || test.date;
      test.end_time = end_time || test.end_time;
      test.duration = duration ? duration * 60 : test.duration;

      await test.save();

      res.status(200).json({ message: 'Test updated successfully', data: test });
    } catch (error) {
      res.status(500).json({ message: 'Error updating test', error });
    }
  }

  // Delete a test by ID
  static async deleteTest(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const test = await Test.findByPk(id);
      if (!test) {
        res.status(404).json({ message: 'Test not found!' });
        return;
      }

      await test.destroy();
      res.status(200).json({ message: 'Test deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting test', error });
    }
  }
}
