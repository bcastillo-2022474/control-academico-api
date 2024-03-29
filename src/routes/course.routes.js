import { Router } from "express";
import { isLoggedIn } from "../middlewares/isLoggedin.js";
import { validateIsTeacher } from "../middlewares/isRoleValidation.js";
import {
  deleteCourseById,
  getAllCourses,
  getCourseById,
  postCourse,
  updateCourseById,
} from "../controllers/course.controllers.js";
import { body, param } from "express-validator";
import { exceptionOnValidation } from "../middlewares/exception-on-validation.js";

const route = Router();

route
  .route("/")
  .get(getAllCourses)
  .post(
    [
      isLoggedIn,
      validateIsTeacher,
      body("title").exists().isLength({ min: 2 }),
      body("description").exists().isLength({ min: 2 }),
      exceptionOnValidation,
    ],
    postCourse,
  );

route
  .route("/:id")
  .get(
    [
      param("id", "Course ID is required").exists().isMongoId(),
      exceptionOnValidation,
    ],
    getCourseById,
  )
  .put(
    [
      isLoggedIn,
      validateIsTeacher,
      param("id", "Course ID is required").isMongoId(),
      body(
        "title",
        "title is optional, but, if defined, needs at least 2 characters",
      )
        .optional()
        .isLength({ min: 2 }),
      body(
        "description",
        "description is optional, but if defined, needs at least 2 characters",
      )
        .optional()
        .isLength({ min: 2 }),
      exceptionOnValidation,
    ],
    updateCourseById,
  )
  .delete(
    [
      isLoggedIn,
      validateIsTeacher,
      param("id", "Course ID is required").exists().isMongoId(),
      exceptionOnValidation,
    ],
    deleteCourseById,
  );

export default route;
