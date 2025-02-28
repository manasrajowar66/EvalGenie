// import { sequelize } from "../config/database";

// import CodingQuestion from "./coding-question";
// import CodingQuestionTag from "./coding-question-tag";
// import Tag from "./tag";
// import BaseFunction from "./base-function";
// import CodingTestCase from "./coding-test-case";
// import TestQuestions from "./test-question";
// import Test from "./test";

// const User = require("./user").default; // Lazy import
// const RecruitmentDrive = require("./recruitment-drive").default; // Lazy import

// // BaseFunction and CodingQuestion
// // CodingQuestion.hasMany(BaseFunction, {
// //   foreignKey: "question_id",
// //   onDelete: "CASCADE",
// // });
// // BaseFunction.belongsTo(CodingQuestion, { foreignKey: "question_id" });

// // // CodingQuestion and Tag
// // CodingQuestion.belongsToMany(Tag, {
// //   through: CodingQuestionTag,
// //   foreignKey: "coding_question_id",
// //   as: "tags",
// // });
// // Tag.belongsToMany(CodingQuestion, {
// //   through: CodingQuestionTag,
// //   foreignKey: "tag_id",
// //   as: "codingQuestions",
// // });

// // // Tag and CodingQuestionTag
// // Tag.hasMany(CodingQuestionTag, {
// //   foreignKey: "tag_id",
// //   as: "codingQuestionTags",
// // });

// // CodingQuestion and CodingTestCase
// // CodingQuestion.hasMany(CodingTestCase, {
// //   foreignKey: "question_id",
// //   onDelete: "CASCADE",
// // });
// // CodingTestCase.belongsTo(CodingQuestion, { foreignKey: "question_id" });

// // // RecruitmentDrive and User
// // RecruitmentDrive.belongsTo(User, { foreignKey: "created_by", as: "creator" });

// // Test and CodingQuestion
// // Test.belongsToMany(CodingQuestion, {
// //   through: TestQuestions,
// //   foreignKey: "test_id",
// //   otherKey: "question_id",
// //   constraints: false,
// // });
// // CodingQuestion.belongsToMany(Test, {
// //   through: TestQuestions,
// //   foreignKey: "question_id",
// //   otherKey: "test_id",
// //   constraints: false,
// // });

// // Establish a relationship with the RecruitmentDrive model
// // Test.belongsTo(RecruitmentDrive, { foreignKey: "recruitment_drive_id" });
// // RecruitmentDrive.hasMany(Test, {
// //   foreignKey: "recruitment_drive_id",
// //   onDelete: "CASCADE",
// // });

// export {
//   User,
//   Test,
//   TestQuestions,
//   RecruitmentDrive,
//   CodingTestCase,
//   BaseFunction,
//   CodingQuestion,
//   CodingQuestionTag,
//   Tag,
// };
