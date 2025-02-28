import express from "express";
import { UserController } from "../controllers/user";
import { restrictToLoggedInUserOnly } from "../middlewares/auth";
import { validateLogin, validateRegister } from "../middlewares/validators/user";

export const router = express.Router();

router.post(
  "/register",
  validateRegister,
  UserController.register
);

router.post(
  "/login",
  validateLogin,
  UserController.login
);

router.get(
  "/auth-check",
  restrictToLoggedInUserOnly,
  UserController.authCheck
);
