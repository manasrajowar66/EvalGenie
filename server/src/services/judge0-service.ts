import axios from "axios";

const JUDGE0_API_URL = "http://localhost:2358"; // Adjust the URL as needed

export class Judge0Service {
  static async compileCode(
    languageId: number,
    sourceCode: string,
    stdin: string
  ) {
    try {
      const response = await axios.post(`${JUDGE0_API_URL}/submissions`, {
        source_code: sourceCode,
        language_id: languageId,
        stdin: stdin,
        expected_output: "", // Optional: provide expected output for comparison
      });
      return response.data;
    } catch (error: any) {
      throw new Error(`Error compiling code: ${error.message}`);
    }
  }

  static async batchSubmission(submissions: any) {
    try {
      const response = await axios.post(`${JUDGE0_API_URL}/submissions/batch`, {
        submissions: submissions,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(`Error in batch submission: ${error.message}`);
    }
  }

  static async getResults(submissionId: string) {
    try {
      const response = await axios.get(
        `${JUDGE0_API_URL}/submissions/${submissionId}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(`Error fetching results: ${error.message}`);
    }
  }

  static async getBatchSubmissionResult(tokens: { token: string }[]) {
    try {
      const tokenString = tokens.map((token) => token.token).join(",");
      const response = await axios.get(
        `${JUDGE0_API_URL}/submissions/batch?tokens=${tokenString}`,
      );
      return response.data.submissions;
    } catch (error: any) {
      throw new Error(`Error fetching results: ${error.message}`);
    }
  }
}
