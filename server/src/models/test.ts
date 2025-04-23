import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import RecruitmentDrive from "./recruitment-drive";

class Test extends Model {
  id!: string;
  name!: string;
  description!: string;
  date!: Date;
  duration!: number;
  end_date!: Date;
  recruitment_drive_id!: string;
  is_active!: boolean;
  is_allow_registration!: boolean;
}

Test.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false, // Start date
    },
    duration: {
      type: DataTypes.INTEGER, // Duration in seconds
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false, // End time of the test
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, // Default to true, indicating the test is active
      allowNull: false,
    },
    is_allow_registration: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, // Default to true, indicating registration is open
      allowNull: false,
    },
    recruitment_drive_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: RecruitmentDrive, // The model the foreign key references
        key: "id", // The field to reference in the RecruitmentDrive table
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "Test",
    tableName: "tests",
    timestamps: true,
  }
);

export default Test;
