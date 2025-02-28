import { Request, Response } from "express";
import { Op, QueryTypes } from "sequelize";
import CodingQuestionTag from "../models/coding-question-tag";
import Tag from "../models/tag";
import CodingQuestion from "../models/coding-question";
import { sequelize } from "../config/database";

export class CodingQuestionTagController {
  static async addCodingQuestionTag(req: Request, res: Response) {
    const { tags } = req.body;
    const { codingQuestionId } = req.params;

    try {
      // Validate Coding Question existence
      const codingQuestion = await CodingQuestion.findByPk(codingQuestionId);
      if (!codingQuestion) {
        res.status(404).json({ message: "Coding question not found." });
        return;
      }

      // Validate Tags existence
      const existingTags = await Tag.findAll({
        where: { id: { [Op.in]: tags } },
      });

      if (existingTags.length !== tags.length) {
        res.status(404).json({ message: "One or more tags not found." });
        return;
      }

      // Fetch existing associations
      const existingCodingTags = await CodingQuestionTag.findAll({
        where: {
          coding_question_id: codingQuestionId,
          tag_id: { [Op.in]: tags },
        },
      });

      const existingTagIds = new Set(
        existingCodingTags.map((tag) => tag.tag_id)
      );

      // Filter out existing tags
      const newCodingTagsData = tags
        .filter((tagId: string) => !existingTagIds.has(tagId)) // Exclude existing pairs
        .map((tagId: string) => ({
          coding_question_id: codingQuestionId,
          tag_id: tagId,
        }));

      if (newCodingTagsData.length === 0) {
        res
          .status(409)
          .json({ message: "All provided tags are already associated." });
        return;
      }

      // Bulk insert new associations
      await CodingQuestionTag.bulkCreate(newCodingTagsData);
      // Fetch updated tags list
      const allCodingQuestionTags = await sequelize.query(
        `SELECT t.id, t.name, cqt.id as cqt_id
         FROM tags t
         JOIN coding_question_tags cqt ON t.id = cqt.tag_id
         WHERE cqt.coding_question_id = :codingQuestionId;`,
        {
          replacements: { codingQuestionId },
          type: QueryTypes.SELECT,
        }
      );

      res
        .status(201)
        .json({
          message: "Tags added successfully!",
          data: allCodingQuestionTags,
        });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Error adding tags", error: error?.message });
    }
  }
  static async deleteCodingQuestionTag(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const deleted = await CodingQuestionTag.destroy({
        where: { id: id },
      });

      if (!deleted){
        res.status(404).json({ message: "Tag association not found." });
        return;
      }

      res.status(200).json({ message: "Tag removed successfully!" });
    } catch (error: any) {
      res.status(500).json({ message: "Error deleting tag", error: error.message });
    }
  }
}
