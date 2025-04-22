import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import CodingQuestion from "../models/coding-question";
import { CodingQuestionTagController } from "./coding-question-tag";
import CodingQuestionTag from "../models/coding-question-tag";
import Tag from "../models/tag";
import CodingTestCase from "../models/coding-test-case";
import { CodingQuestionRepository } from "../repositories/codingQuestionRepository";

export class CodingQuestionController {
  static async createCodingQuestion(req: Request, res: Response) {
    try {
      const {
        title,
        description,
        input_format,
        output_format,
        time_limit_milliseconds,
        difficulty_level,
        constraints,
        tags,
      } = req.body;
      const user = req.user as JwtPayload;

      const newQuestion = await CodingQuestion.create({
        title,
        description,
        input_format,
        output_format,
        time_limit_milliseconds,
        difficulty_level,
        constraints,
        created_by: user.id,
      });

      //   req.body.isComingFromCodingQuestion = true;
      //   req.body.codingQuestionId = newQuestion.id;
      //   await CodingQuestionTagController.addCodingQuestionTag(req, res);

      res.status(201).json({
        message: "Coding question created successfully!",
        data: newQuestion,
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Error creating coding question",
        error: error.message,
      });
    }
  }

  static async updateCodingQuestion(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const {
        title,
        description,
        input_format,
        output_format,
        time_limit_milliseconds,
        difficulty_level,
        constraints,
      } = req.body;

      const question = await CodingQuestion.findByPk(id);

      if (!question) {
        res.status(404).json({ message: "Coding question not found!" });
        return;
      }

      await question.update({
        title: title || question.title,
        description: description || question.description,
        input_format: input_format || question.input_format,
        output_format: output_format || question.output_format,
        time_limit_milliseconds:
          time_limit_milliseconds || question.time_limit_milliseconds,
        difficulty_level: difficulty_level || question.difficulty_level,
        constraints: constraints || question.constraints,
      });

      res.status(200).json({
        message: "Coding question updated successfully!",
        data: question,
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Error updating coding question",
        error: error.message,
      });
    }
  }

  static async deleteCodingQuestion(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const question = await CodingQuestion.findByPk(id);

      if (!question) {
        res.status(404).json({ message: "Coding question not found!" });
        return;
      }

      await question.destroy();
      res
        .status(200)
        .json({ message: "Coding question deleted successfully!" });
    } catch (error: any) {
      res.status(500).json({
        message: "Error deleting coding question",
        error: error.message,
      });
    }
  }

  static async getCodingQuestions(req: Request, res: Response) {
    try {
      const questions = await CodingQuestion.findAll({
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: Tag,
            as: "tags",
            attributes: ["id", "name"],
            through: {
              as: "codingQuestionTag",
              attributes: ["id"],
            },
          },
        ],
      });

      res.status(200).json({ data: questions });
    } catch (error: any) {
      res.status(500).json({
        message: "Error fetching coding questions",
        error: error.message,
      });
    }
  }

  static async getCodingQuestionById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const question = await CodingQuestionRepository.getCodingQuestionById(id);
      if (!question) {
        res.status(404).json({ message: "Coding question not found!" });
        return;
      }

      res.status(200).json({ data: question });
    } catch (error: any) {
      res.status(500).json({
        message: "Error fetching coding questions",
        error: error.message,
      });
    }
  }
}
