// import CodingQuestion from "./coding-question";
// import Tag from "./tag";
// import CodingQuestionTag from "./coding-question-tag";
// import CodingTestCase from "./coding-test-case";

// // Coding Question ↔ Tag (Many-to-Many)
// CodingQuestion.belongsToMany(Tag, {
//   through: CodingQuestionTag,
//   foreignKey: "coding_question_id",
//   as: "tags",
// });

// Tag.belongsToMany(CodingQuestion, {
//   through: CodingQuestionTag,
//   foreignKey: "tag_id",
//   as: "codingQuestions",
// });

// // Coding Question ↔ Test Cases (One-to-Many)
// CodingQuestion.hasMany(CodingTestCase, {
//   foreignKey: "question_id",
//   as: "testCases",
// });
// CodingTestCase.belongsTo(CodingQuestion, {
//   foreignKey: "question_id",
// });

// export default function setupAssociations() {}
