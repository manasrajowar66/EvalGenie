import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import User from "./user";
import Tag from "./tag";
import CodingQuestionTag from "./coding-question-tag";
import CodingTestCase from "./coding-test-case";

export enum DifficultyLevel {
  EASY = "Easy",
  MEDIUM = "Medium",
  HARD = "Hard",
}

// Coding Questions Table
class CodingQuestion extends Model {
  id!: string;
  title!: string;
  description!: string;
  input_format!: string;
  output_format!: string;
  time_limit_milliseconds!: number;
  difficulty_level!: DifficultyLevel;
  constraints!: string;
  function_signature!: string;
  created_by!: string;
}

CodingQuestion.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    input_format: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    output_format: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    time_limit_milliseconds: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    difficulty_level: {
      type: DataTypes.ENUM,
      values: Object.values(DifficultyLevel),
      allowNull: true,
    },
    constraints: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_by: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "CodingQuestion",
    tableName: "coding_questions",
    timestamps: true,
  }
);

// // Add this association
Tag.belongsToMany(CodingQuestion, {
  through: CodingQuestionTag,
  foreignKey: "tag_id",
  as: "codingQuestions",
});

// Add this association
CodingQuestion.belongsToMany(Tag, {
  through: CodingQuestionTag,
  foreignKey: "coding_question_id",
  as: "tags",
});

CodingQuestion.belongsToMany(CodingTestCase, {
  through: CodingTestCase,
  foreignKey: "question_id",
  as: "testCases",
});

export default CodingQuestion;
