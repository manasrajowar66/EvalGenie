import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();


export const restrictToLoggedInUserOnly = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("x-auth-token");
  const jwtSecret = process.env.jwtSecret as string;

  if (!token) {
    res.status(401).json({ message: "No token, autherize denied" });
  } else {
    try {
      const decode = jwt.verify(token, jwtSecret);
      req["user"] = decode;
      next();
    } catch (error) {
      res.status(401).json({ message: "Token is not valid." });
    }
  }
};

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("x-auth-token");
  const jwtSecret = process.env.jwtSecret as string;

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decode = jwt.verify(token, jwtSecret);
    req.user = decode;
  } catch (error) {
    req.user = null;
  }

  next();
};
