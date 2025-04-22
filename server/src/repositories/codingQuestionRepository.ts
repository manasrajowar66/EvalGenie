import { sequelize } from "../config/database";
import { QueryTypes } from "sequelize";

type CodingQuestion = Record<string, any>;

export class CodingQuestionRepository {
  static async getCodingQuestionById(id: string, sampleTestCase = false) {
    const codingQuestion = await this.fetchCodingQuestion(id);
    if (!codingQuestion) return null;

    const [tags, testCases, baseFunctions] = await Promise.all([
      this.fetchTags(id),
      this.fetchTestCases(id, sampleTestCase),
      this.fetchBaseFunctions(id),
    ]);

    return {
      ...codingQuestion,
      tags,
      testCases,
      baseFunctions,
    };
  }

  private static async fetchCodingQuestion(id: string): Promise<CodingQuestion | null> {
    const result = await sequelize.query(
      `SELECT * FROM coding_questions WHERE id = :codingQuestionId`,
      {
        replacements: { codingQuestionId: id },
        type: QueryTypes.SELECT,
      }
    );

    return result[0] ?? null;
  }

  private static async fetchTags(id: string) {
    return await sequelize.query(
      `
        SELECT t.id, t.name, cqt.id AS cqt_id
        FROM tags t
        JOIN coding_question_tags cqt ON t.id = cqt.tag_id
        WHERE cqt.coding_question_id = :codingQuestionId
      `,
      {
        replacements: { codingQuestionId: id },
        type: QueryTypes.SELECT,
      }
    );
  }

  private static async fetchTestCases(id: string, onlySample = false) {
    const whereClause = onlySample ? "AND is_sample = true" : "";

    return await sequelize.query(
      `
        SELECT id, input, expected_output, is_sample
        FROM coding_test_cases
        WHERE coding_question_id = :codingQuestionId ${whereClause}
      `,
      {
        replacements: { codingQuestionId: id },
        type: QueryTypes.SELECT,
      }
    );
  }

  private static async fetchBaseFunctions(id: string) {
    return await sequelize.query(
      `
        SELECT id, question_id, language, base
        FROM base_functions
        WHERE question_id = :codingQuestionId
      `,
      {
        replacements: { codingQuestionId: id },
        type: QueryTypes.SELECT,
      }
    );
  }
}
