import express from "express";
import { router as userRouter } from "./user";
import { router as recruitmentDriveRouter } from "./recruitment-drive";
import { restrictToLoggedInUserOnly } from "../middlewares/auth";
import { router as testRouter } from "./test";
import { router as tagRouter } from "./tag";
import { router as codingQuestionRouter } from "./coding-question";
import { router as codingQuestionTagRouter } from "./coding-question-tag";
import { router as codingQuestionTestCaseRouter } from "./coding-question-test-case";
import { router as baseFunctionRouter } from "./base-function";

export const indexRouter = express.Router();

indexRouter.use("/user", userRouter);
indexRouter.use("/recruitment-drive", restrictToLoggedInUserOnly, recruitmentDriveRouter);
indexRouter.use("/tests", restrictToLoggedInUserOnly, testRouter);
indexRouter.use("/tags", restrictToLoggedInUserOnly, tagRouter);
indexRouter.use("/coding-questions", restrictToLoggedInUserOnly, codingQuestionRouter);
indexRouter.use("/coding-question-tag", restrictToLoggedInUserOnly, codingQuestionTagRouter);
indexRouter.use("/coding-question-test-cases", restrictToLoggedInUserOnly, codingQuestionTestCaseRouter);
indexRouter.use("/base-functions", restrictToLoggedInUserOnly, baseFunctionRouter);