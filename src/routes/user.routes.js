import { Router } from "express";
import {
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from "../controllers/user.controllers.js";
import { param, query } from "express-validator";
import { exceptionOnValidation } from "../middlewares/exception-on-validation.js";
import { validateIsTeacher } from "../middlewares/isRoleValidation.js";
import { isLoggedIn } from "../middlewares/isLoggedin.js";

const route = Router();

route
  .route("/")
  .get(
    [
      query(
        "page",
        "Page is optional, but if defined, must be a number",
      ).isNumeric(),
      query(
        "limit",
        "Limit is optional, but if defined, must be a number",
      ).isNumeric(),
      query("role").optional().isIn(["TEACHER", "STUDENT"]),
      exceptionOnValidation,
    ],
    getAllUsers,
  );

route
  .route("/:id")
  .get(
    [
      param("id", "User ID is required").exists().isMongoId(),
      exceptionOnValidation,
    ],
    getUserById,
  )
  .put(
    [
      isLoggedIn,
      validateIsTeacher,
      param("id", "User ID is required, and next to be Mongo ID")
        .exists()
        .isMongoId(),
      exceptionOnValidation,
    ],
    updateUserById,
  )
  .delete(
    [
      isLoggedIn,
      validateIsTeacher,
      param("id", "User ID is required, and next to be Mongo ID")
        .exists()
        .isMongoId(),
      exceptionOnValidation,
    ],
    deleteUserById,
  );

export default route;
