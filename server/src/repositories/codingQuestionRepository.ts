import { sequelize } from "../config/database";
import { QueryTypes } from "sequelize";

export class CodingQuestionRepository {
  static async getCodingQuestionById(id: string) {
    const query = `
      SELECT 
          cq.id,
          cq.title,
          cq.description,
          cq.input_format,
          cq.output_format,
          cq.time_limit_milliseconds,
          cq.difficulty_level,
          cq.constraints,
          cq.created_by,
          cq."createdAt",
          cq."updatedAt",
          (
              SELECT JSON_ARRAYAGG(
                  jsonb_build_object(
                      'id', t.id,
                      'name', t.name,
                      'cqt_id', cqt.id
                  )
              )
              FROM tags t
              JOIN coding_question_tags cqt ON t.id = cqt.tag_id
              WHERE cqt.coding_question_id = cq.id
          ) AS tags,
          (
              SELECT JSON_ARRAYAGG(
                  jsonb_build_object(
                      'id', ctc.id,
                      'input', ctc.input,
                      'expected_output', ctc.expected_output,
                      'is_sample', ctc.is_sample
                  )
              )
              FROM coding_test_cases ctc
              WHERE ctc.coding_question_id = cq.id
          ) AS "testCases"
      FROM coding_questions cq
      WHERE cq.id = :codingQuestionId;
    `;

    return await sequelize.query(query, {
      replacements: { codingQuestionId: id },
      type: QueryTypes.SELECT,
    });
  }
}
