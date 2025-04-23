import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database"; // Make sure you import the sequelize instance
import { randomBytes, createHmac } from "crypto";

// User enumeration for user types
export enum UserType {
  ADMIN = "admin",
  USER = "user"
}

// User Model class definition
class User extends Model {
  id!: string;
  full_name!: string;
  email!: string;
  password!: string;
  salt!: string;
  role!: UserType;
}

// Define the User model
User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      values: Object.values(UserType),
      type: DataTypes.ENUM,
      allowNull: false,
      defaultValue: UserType.USER,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
    hooks: {
      // Lifecycle hook before creating a new user
      beforeCreate: async (user: User) => {
        const salt = randomBytes(16).toString("hex"); // Generate a random salt
        user.salt = salt;
        user.password = createHmac("sha256", salt)
          .update(user.password)
          .digest("hex");
      },
    },
  }
);

export default User;
