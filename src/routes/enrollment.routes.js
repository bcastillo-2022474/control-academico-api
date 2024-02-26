import { Router } from "express";
import {
  isAlreadyEnrolled,
  isAlreadyOn3Courses,
} from "../middlewares/isAlreadyEnrolled.js";
import { isLoggedIn } from "../middlewares/isLoggedin.js";
import { validateIsTeacherOrEnrollingStudent } from "../middlewares/isRoleValidation.js";
import {
  enrollStudentToCourse,
  getAllEnrollments,
  unenrollStudentFromCourse,
} from "../controllers/enrollment.controllers.js";
import { body, check, param } from "express-validator";
import { exceptionOnValidation } from "../middlewares/exception-on-validation.js";

const router = Router();

router.route("/").get(getAllEnrollments);

router
  .route("/:course")
  .post(
    [
      isLoggedIn,
      body("student", "Student ID is required").not().isEmpty().isMongoId(),
      param("course", "Course ID is required").not().isEmpty().isMongoId(),
      exceptionOnValidation,
      validateIsTeacherOrEnrollingStudent,
      isAlreadyEnrolled,
      isAlreadyOn3Courses,
    ],
    enrollStudentToCourse,
  )
  .delete(
    [
      isLoggedIn,
      body("student", "Student ID is required").not().isEmpty().isMongoId(),
      param("course", "Course ID is required").not().isEmpty().isMongoId(),
      exceptionOnValidation,
      validateIsTeacherOrEnrollingStudent,
    ],
    unenrollStudentFromCourse,
  );

export default router;
