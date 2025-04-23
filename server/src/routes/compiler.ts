import { Router } from "express";
import { JudgeController } from "../controllers/compiler-controller";

export const router = Router();

router.post("/compile/:cq_id", JudgeController.compileCode);
