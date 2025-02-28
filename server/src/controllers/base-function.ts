import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Generate_Base_Functions } from "../ai-promps/generateBaseFunctions";
import CodingQuestion from "../models/coding-question";
import { CodingQuestionRepository } from "../repositories/codingQuestionRepository";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY as string;

export class BaseFunctionController {
  static async generateBaseFunctions(req: Request, res: Response) {
    const { codingQuestionId } = req.params;
    try {
      // Validate Coding Question existence
      const codingQuestion = await CodingQuestionRepository.getCodingQuestionById(codingQuestionId);
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

      res.status(200).json({
        success: true,
        baseFunctions: JSON.parse(aiGeneratedFunctions),
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
    }
  }
}
