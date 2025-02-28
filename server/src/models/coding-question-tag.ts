import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import CodingQuestion from "./coding-question";
import Tag from "./tag";

class CodingQuestionTag extends Model {
  id!: string;
  coding_question_id!: string;
  tag_id!: string;
}

CodingQuestionTag.init(
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
    tag_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Tag,
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "CodingQuestionTag",
    tableName: "coding_question_tags",
    timestamps: true,
  }
);

// ✅ Corrected: Associate with Tag and CodingQuestion
// CodingQuestionTag.belongsTo(Tag, { foreignKey: "tag_id", as: "tag" });
// CodingQuestionTag.belongsTo(CodingQuestion, {
//   foreignKey: "coding_question_id",
//   as: "codingQuestion",
// });

export default CodingQuestionTag;
