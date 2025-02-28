import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import RecruitmentDrive from "../models/recruitment-drive";

export class RecruitmentDriveController {
  static async createRecruitmentDrive(req: Request, res: Response) {
    try {
      const { name, description, instituteName, session } = req.body;
      const user = req.user as JwtPayload;

      const newDrive = await RecruitmentDrive.create({
        name,
        description,
        institute_name: instituteName,
        session,
        created_by: user.id,
      });

      res.status(201).json({ message: "Recruitment drive created!", data: newDrive });
    } catch (error: any) {
      res.status(500).json({ message: "Error creating drive", error: error.message });
    }
  }

  static async updateRecruitmentDrive(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, description, instituteName, session, status } = req.body;

      const drive = await RecruitmentDrive.findByPk(id);

      if (!drive) {
        res.status(404).json({ message: "Drive not found!" });
        return;
      }

      await drive.update({
        name: name || drive.name,
        description: description || drive.description,
        institute_name: instituteName || drive.institute_name,
        session: session || drive.session,
        status: status || drive.status,
      });

      res.status(200).json({ message: "Drive updated successfully!", data: drive });
    } catch (error: any) {
      res.status(500).json({ message: "Error updating drive", error: error?.message });
    }
  }

  static async deleteRecruitmentDrive(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const drive = await RecruitmentDrive.findByPk(id);

      if (!drive) {
        res.status(404).json({ message: "Drive not found!" });
        return;
      }

      await drive.destroy();

      res.status(200).json({ message: "Drive deleted successfully!" });
    } catch (error: any) {
      res.status(500).json({ message: "Error deleting drive", error: error?.message });
    }
  }

  static async getRecruitmentDrives(req: Request, res: Response) {
    try {
      const user = req.user as JwtPayload;

      const drives = await RecruitmentDrive.findAll({
        where: { created_by: user.id },
        order: [["createdAt", "DESC"]],
      });

      res.status(200).json({ data: drives });
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching drives", error: error?.message });
    }
  }
}
