import { Router } from "express";
import { TagController } from "../controllers/tag";


export const router = Router();

router.get("/", TagController.getTags);