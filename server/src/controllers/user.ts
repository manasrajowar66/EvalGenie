import { Request, Response } from "express";
import User from "../models/user"; // Sequelize User model
import { createHmac } from "crypto";
import { generateToken } from "./auth";
import _ from "lodash";
import { JwtPayload } from "jsonwebtoken";

export class UserController {
  static async register(req: Request, res: Response) {
    try {
      const { full_name, email, password } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        res.status(400).json({ message: "Email already exists" });
        return;
      }

      // Create new user instance
      const newUser = await User.create({
        full_name,
        email,
        password,
      });

      res.status(201).json({ message: "User registered successfully", user: _.pick(newUser, ["id", "email", "full_name"]) });
    } catch (error: any) {
      res.status(500).json({ message: "Error registering user", error: error?.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Find user by email
      const user = await User.findOne({ where: { email } });
      if (!user) {
        res.status(400).json({ message: "Invalid email or password" });
        return;
      }

      // Verify password
      const hashPassword = createHmac("sha256", user.salt).update(password).digest("hex");
      if (hashPassword !== user.password) {
        res.status(400).json({ message: "Invalid email or password" });
        return;
      }

      // Generate JWT token
      const tokenData = _.pick(user, ["id", "email", "full_name", "role"]);
      const token = generateToken(tokenData);

      res.json({ message: "Login successful", token, user: tokenData });
    } catch (error: any) {
      res.status(500).json({ message: "Error logging in", error: error.message });
    }
  }

  static async authCheck(req: Request, res: Response) {
    const user = req.user as JwtPayload;
    res.json({ message: "Authenticated", user });
  }
}
