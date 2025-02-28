import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import Test from "./test"

class TestQuestions extends Model {}

TestQuestions.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    test_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Test,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    question_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    question_type: {
      type: DataTypes.ENUM("coding", "mcq"),
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER, // To maintain question order in the test
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "TestQuestions",
    tableName: "test_questions",
    timestamps: true,
  }
);

// TestQuestions.belongsTo()

export default TestQuestions;
