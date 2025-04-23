import { Request, Response } from "express";
import { Judge0Service } from "../services/judge0-service";
import CodingQuestion from "../models/coding-question";
import CodingTestCase from "../models/coding-test-case";
import { languageIds } from "../utils/languageIds";

export class JudgeController {
  static async compileCode(req: Request, res: Response): Promise<void> {
    try {
      // const { source_code, language_id, stdin } = req.body;
      // const result = await Judge0Service.compileCode(source_code, language_id, stdin);
      // res.status(200).json(result);
      const { cq_id } = req.params;
      const { source_code, language } = req.body;

      const language_id = languageIds[language];
      if (!language_id) {
        res.status(400).json({ error: "Invalid programming language." });
        return;
      }

      const testCases = await CodingTestCase.findAll({
        where: { coding_question_id: cq_id },
      });

      if (!testCases || testCases.length === 0) {
        res.status(404).json({
          error: "No test cases found for the given coding question.",
        });
        return;
      }

      const submissions: any[] = [];

      // Iterate over each test case
      for (const testCase of testCases) {
        const { input, expected_output, is_sample } = testCase;
        // Prepare the submission object for batch processing
        submissions.push({
          source_code,
          language_id,
          stdin: input,
          expected_output,
          is_sample
        });
      }

      const batchResult = await Judge0Service.batchSubmission(submissions);
      if (!batchResult || batchResult.length === 0) {
        res.status(500).json({
          error: "Failed to submit batch for compilation.",
        });
        return;
      }

      let submissionResults: any[] =
        await Judge0Service.getBatchSubmissionResult(batchResult);

      // check submission status still in queue or processing
      while (JudgeController.checkBatchSubmissionResult(submissionResults)) {
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 2 seconds before checking again
        submissionResults = await Judge0Service.getBatchSubmissionResult(
          batchResult
        );
      }

      // Map the results to a more readable format
      const result = submissionResults.map((result: any, index) => {
        return {
          ...result,
          stdin: submissions[index]?.is_sample || true ? submissions[index]?.stdin : null,
          expected_output: submissions[index]?.is_sample || true ? submissions[index]?.expected_output : null,
          is_sample: submissions[index]?.is_sample,
        };
      });

      // Send the results back to the client
      res.status(200).json({
        success: true,
        submissions: result
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while compiling the code." });
    }
  }

  private static checkBatchSubmissionResult(submissionResults: any[]): boolean {
    return (
      submissionResults &&
      submissionResults.length > 0 &&
      submissionResults.find(
        (result: any) => result.status.id === 1 || result.status.id === 2
      )
    );
  }

  static async getResults(req: Request, res: Response): Promise<void> {
    try {
      const { token } = req.params;
      const result = await Judge0Service.getResults(token);
      res.status(200).json(result);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while retrieving the results." });
    }
  }
}
