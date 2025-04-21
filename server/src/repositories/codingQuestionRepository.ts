import { sequelize } from "../config/database";
import { QueryTypes } from "sequelize";

const allTestCaseQuery = `
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
          SELECT COALESCE(JSON_ARRAYAGG(
            jsonb_build_object(
                'id', t.id,
                'name', t.name,
                'cqt_id', cqt.id
            )
          ), '[]'::jsonb)
          FROM tags t
          JOIN coding_question_tags cqt ON t.id = cqt.tag_id
          WHERE cqt.coding_question_id = cq.id
        ) AS tags,
        (
          SELECT COALESCE(JSON_ARRAYAGG(
            jsonb_build_object(
                'id', ctc.id,
                'input', ctc.input,
                'expected_output', ctc.expected_output,
                'is_sample', ctc.is_sample
            )
          ), '[]'::jsonb)
          FROM coding_test_cases ctc
          WHERE ctc.coding_question_id = cq.id
        ) AS "testCases",
        (
          SELECT COALESCE(JSON_ARRAYAGG(
            jsonb_build_object(
              'id', bfs.id,
              'question_id', bfs.question_id,
              'language', bfs.language,
              'base', bfs.base
            )
          ), '[]'::jsonb)
          FROM base_functions bfs
          WHERE bfs.question_id = cq.id
        ) AS "baseFunctions"
    FROM coding_questions cq
    WHERE cq.id = :codingQuestionId;
    `;

const sampleTestCaseQuery = `
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
            SELECT COALESCE(JSON_ARRAYAGG(
                jsonb_build_object(
                    'id', t.id,
                    'name', t.name,
                    'cqt_id', cqt.id
                )
            ), '[]'::jsonb)
            FROM tags t
            JOIN coding_question_tags cqt ON t.id = cqt.tag_id
            WHERE cqt.coding_question_id = cq.id
        ) AS tags,
        (
            SELECT COALESCE(JSON_ARRAYAGG(
                jsonb_build_object(
                    'id', ctc.id,
                    'input', ctc.input,
                    'expected_output', ctc.expected_output,
                    'is_sample', ctc.is_sample
                )
            ), '[]'::jsonb)
            FROM coding_test_cases ctc
            WHERE ctc.coding_question_id = cq.id and ctc.is_sample = true
        ) AS "testCases",
        (
            SELECT COALESCE(JSON_ARRAYAGG(
                jsonb_build_object(
                    'id', bfs.id,
                    'question_id', bfs.question_id,
                    'language', bfs.language,
                    'base', bfs.base
                )
            ), '[]'::jsonb)
            FROM base_functions bfs
            WHERE bfs.question_id = cq.id
        ) AS "baseFunctions"
    FROM coding_questions cq
    WHERE cq.id = :codingQuestionId;
  `;

export class CodingQuestionRepository {
  static async getCodingQuestionById(id: string, sampleTestCase?: boolean) {
    let query = allTestCaseQuery;

    if (sampleTestCase) {
      query = sampleTestCaseQuery;
    }

    return await sequelize.query(query, {
      replacements: { codingQuestionId: id },
      type: QueryTypes.SELECT,
    });
  }
}
