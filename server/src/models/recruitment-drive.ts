import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import User from "./user";
import Test from "./test";

export enum DriveStatus {
  IN_PROGRESS = "inprogress",
  COMPLETED = "completed",
}

class RecruitmentDrive extends Model {
  id!: string;
  name!: string;
  description!: string;
  institute_name!: string;
  session?: string;
  status!: DriveStatus;
  created_by!: string;
}

RecruitmentDrive.init(
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    institute_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    session: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM,
      values: Object.values(DriveStatus),
      defaultValue: DriveStatus.IN_PROGRESS,
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
    modelName: "RecruitmentDrive",
    tableName: "recruitment_drives",
    timestamps: true,
  }
);

RecruitmentDrive.hasMany(Test, { foreignKey: "recruitment_drive_id", onDelete: "CASCADE" });
Test.belongsTo(RecruitmentDrive, { foreignKey: "recruitment_drive_id", onDelete: "CASCADE" });

export default RecruitmentDrive;
