import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import CodingQuestion from "./coding-question";
import CodingQuestionTag from "./coding-question-tag";

class Tag extends Model {
  id!: string;
  name!: string;
}

Tag.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Tag",
    tableName: "tags",
    timestamps: true,
  }
);

// ✅ Many-to-Many Association with CodingQuestion
// Tag.belongsToMany(CodingQuestion, {
//   through: CodingQuestionTag,
//   foreignKey: "tag_id",
//   as: "codingQuestions",
// });

export default Tag;
