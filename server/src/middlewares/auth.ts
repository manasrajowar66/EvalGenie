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

export const restrictToRoles = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("x-auth-token");
    const jwtSecret = process.env.jwtSecret as string;

    if (!token) {
     res.status(401).json({ message: "No token, authorization denied" });
     return;
    }

    try {
      const decoded = jwt.verify(token, jwtSecret) as { role?: string };

      if (!decoded.role || !allowedRoles.includes(decoded.role)) {
        res.status(403).json({ message: "Access denied. Role not authorized." });
        return;
      }

      req["user"] = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: "Token is not valid." });
      return;
    }
  };
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
