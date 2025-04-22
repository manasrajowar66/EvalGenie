import { Request, Response } from "express";
import { QueryTypes } from "sequelize";
import CodingTestCase from "../models/coding-test-case";
import CodingQuestion from "../models/coding-question";
import { sequelize } from "../config/database";

export class CodingTestCaseController {
  /**
   * Add a single test case to a coding question
   */
  static async addTestCase(req: Request, res: Response) {
    const { input, expected_output, is_sample } = req.body;
    const { codingQuestionId } = req.params;

    try {
      // Validate Coding Question existence
      const codingQuestion = await CodingQuestion.findByPk(codingQuestionId);
      if (!codingQuestion) {
        res.status(404).json({ message: "Coding question not found." });
        return;
      }

      //   // Validate request body
      //   if (!input || !expected_output) {
      //     return res.status(400).json({ message: "Input and expected_output are required." });
      //   }

      // Create a new test case
      const newTestCase = await CodingTestCase.create({
        coding_question_id: codingQuestionId,
        input,
        expected_output,
        is_sample: is_sample ?? false,
      });

      res.status(201).json({
        message: "Test case added successfully!",
        data: newTestCase, // Return the first (and only) created test case
      });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Error adding test case", error: error?.message });
    }
  }

  /**
   * Delete a test case
   */
  static async deleteTestCase(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const deleted = await CodingTestCase.destroy({
        where: { id },
      });

      if (!deleted) {
        res.status(404).json({ message: "Test case not found." });
        return;
      }

      res.status(200).json({ message: "Test case removed successfully!" });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Error deleting test case", error: error.message });
    }
  }

  /**
   * Update a test case
   */
  static async updateTestCase(req: Request, res: Response) {
    const { id } = req.params;
    const { input, expected_output, is_sample } = req.body;

    try {
      const testCase = await CodingTestCase.findByPk(id);
      if (!testCase) {
        res.status(404).json({ message: "Test case not found." });
        return;
      }

      // Update the test case
      testCase.input = input ?? testCase.input;
      testCase.expected_output = expected_output ?? testCase.expected_output;
      testCase.is_sample = is_sample ?? testCase.is_sample;
      await testCase.save();

      res
        .status(200)
        .json({ message: "Test case updated successfully!", data: testCase });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Error updating test case", error: error.message });
    }
  }
}
