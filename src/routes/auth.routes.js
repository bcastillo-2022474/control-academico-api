import { Router } from "express";
import { login, signup } from "../controllers/auth.controllers.js";
import { body } from "express-validator";
import { exceptionOnValidation } from "../middlewares/exception-on-validation.js";

const router = Router();

router.post(
  "/login",
  [
    body("email").exists().isEmail(),
    body("password").exists().isLength({ min: 3 }),
    exceptionOnValidation,
  ],
  login,
);

router.post(
  "/signup",
  [
    body("name").exists().isLength({ min: 3 }),
    body("email").exists().isEmail(),
    body("password").exists().isLength({ min: 3 }),
    body("role").exists().isIn(["STUDENT", "TEACHER"]),
    exceptionOnValidation,
  ],
  signup,
);

export default router;
