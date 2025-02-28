import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import CodingQuestion from "./coding-question";

class CodingTestCase extends Model {
  id!: string;
  coding_question_id!: string;
  input!: string;
  expected_output!: string;
  is_sample!: boolean;
}

CodingTestCase.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    coding_question_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: CodingQuestion,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    input: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    expected_output: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    is_sample: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // False for hidden cases, true for sample cases
    },
  },
  {
    sequelize,
    modelName: "CodingTestCase",
    tableName: "coding_test_cases",
    timestamps: true,
  }
);

export default CodingTestCase;
