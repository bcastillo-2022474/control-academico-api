import { Router } from "express";
import {
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from "../controllers/user.controllers.js";
import { param } from "express-validator";
import { exceptionOnValidation } from "../middlewares/exception-on-validation.js";
import { validateIsTeacher } from "../middlewares/isRoleValidation.js";

const route = Router();

route.route("/").get(getAllUsers);

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
      validateIsTeacher,
      param("id", "User ID is required").exists().isMongoId(),
      exceptionOnValidation,
    ],
    updateUserById,
  )
  .delete(
    [
      validateIsTeacher,
      param("id", "User ID is required").exists().isMongoId(),
      exceptionOnValidation,
    ],
    deleteUserById,
  );

export default route;
