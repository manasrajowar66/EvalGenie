import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Generate_Base_Functions } from "../ai-promps/generateBaseFunctions";
import { CodingQuestionRepository } from "../repositories/codingQuestionRepository";
import BaseFunction from "../models/base-function";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY as string;

export class BaseFunctionController {
  static async generateBaseFunctions(req: Request, res: Response) {
    const { codingQuestionId } = req.params;
    try {
      // Validate Coding Question existence
      const codingQuestion =
        await CodingQuestionRepository.getCodingQuestionById(codingQuestionId);
      if (!codingQuestion || codingQuestion.length === 0) {
        res.status(404).json({ message: "Coding question not found." });
        return;
      }

      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        systemInstruction: Generate_Base_Functions(codingQuestion[0]),
        generationConfig: {
          responseMimeType: "application/json",
        },
      });

      // Send prompt to Gemini AI model
      const response = await model.generateContent({
        contents: [
          { role: "user", parts: [{ text: "Generate the response" }] },
        ],
      });

      const aiGeneratedFunctions = response.response.text(); // Extract generated content

      if (!aiGeneratedFunctions) {
        res.status(500).json({ message: "Failed to generate base functions." });
        return;
      }

      // Save the generated base functions to the database
      const baseFunctions = JSON.parse(aiGeneratedFunctions);

      if (!baseFunctions.language_templates) {
        res.status(500).json({ message: "Invalid response format from AI." });
        return;
      }

      // Delete previously created base functions for the coding question
      await BaseFunction.destroy({ where: { question_id: codingQuestionId } });

      // Prepare data to insert
      const dataToInsert = baseFunctions.language_templates = Object.entries(
        baseFunctions.language_templates
      ).map(([language, code]) => ({
        question_id: codingQuestionId,
        language: language,
        base: code,
      }));

      await BaseFunction.bulkCreate(dataToInsert);

      // Retrieve all created base functions for the coding question
      const createdBaseFunctions = await BaseFunction.findAll({
        where: { question_id: codingQuestionId },
      });

      res.status(200).json({
        success: true,
        baseFunctions: createdBaseFunctions,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
    }
  }

  static async getBaseFunctions(req: Request, res: Response) {
    const { codingQuestionId } = req.params;
    try {
      const baseFunctions = await BaseFunction.findAll({
        where: { question_id: codingQuestionId },
      });

      res.status(200).json({
        success: true,
        baseFunctions,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
    }
  }
}
