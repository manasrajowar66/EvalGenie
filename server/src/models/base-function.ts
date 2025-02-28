import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import CodingQuestion from "./coding-question";

class BaseFunction extends Model {
  id!: string;
  question_id!: string;
  language!: string;
  base!: string;
}

BaseFunction.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    question_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: CodingQuestion,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    base: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "BaseFunction",
    tableName: "base_functions",
    timestamps: true,
  }
);

export default BaseFunction;
