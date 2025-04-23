import express from "express";
import { router as userRouter } from "./user";
import { router as recruitmentDriveRouter } from "./recruitment-drive";
import { restrictToRoles } from "../middlewares/auth";
import { router as testRouter } from "./test";
import { router as tagRouter } from "./tag";
import { router as codingQuestionRouter } from "./coding-question";
import { router as codingQuestionTagRouter } from "./coding-question-tag";
import { router as codingQuestionTestCaseRouter } from "./coding-question-test-case";
import { router as baseFunctionRouter } from "./base-function";
import { router as judge0Router } from "./compiler";

export const indexRouter = express.Router();

indexRouter.use("/user", userRouter);
indexRouter.use("/recruitment-drive", restrictToRoles("admin"), recruitmentDriveRouter);
indexRouter.use("/tests", restrictToRoles("admin"), testRouter);
indexRouter.use("/tags", restrictToRoles("admin"), tagRouter);
indexRouter.use("/coding-questions", restrictToRoles("admin"), codingQuestionRouter);
indexRouter.use("/coding-question-tag", restrictToRoles("admin"), codingQuestionTagRouter);
indexRouter.use("/coding-question-test-cases", restrictToRoles("admin"), codingQuestionTestCaseRouter);
indexRouter.use("/base-functions", restrictToRoles("admin"), baseFunctionRouter);
indexRouter.use("/compiler", restrictToRoles("admin"), judge0Router);