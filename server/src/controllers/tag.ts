import { Request, Response } from "express";
import Tag from "../models/tag";

export class TagController {
  static async getTags(req: Request, res: Response) {
    try {
      const tags = await Tag.findAll({
        order: [["name", "ASC"]],
      });
      res.status(200).json({ data: tags });
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching tags", error: error?.message });
    }
  }
}
