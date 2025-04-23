import { Router } from "express";
import { RecruitmentDriveController } from "../controllers/recruitment-drive";
import { validateRecruitmentDrive } from "../middlewares/validators/recruitment-drive";


export const router = Router();

router.post("/", validateRecruitmentDrive , RecruitmentDriveController.createRecruitmentDrive); // Create a new drive
router.put("/:id", validateRecruitmentDrive, RecruitmentDriveController.updateRecruitmentDrive); // Update an existing drive
router.delete("/:id", RecruitmentDriveController.deleteRecruitmentDrive); // Delete a drive
router.get("/", RecruitmentDriveController.getRecruitmentDrives); // Get all drives
router.get("/:id", RecruitmentDriveController.getRecruitmentDriveById); // Get a drive by ID