import Enrollment from "../model/enrollment.js";

export const isAlreadyEnrolled = async (req, res, next) => {
  // check that user isnt already enrolled
  const { course } = req.params;
  const { student } = req.body;
  const enrollment = await Enrollment.findOne({
    course,
    email: student,
    tp_status: true,
  });
  if (enrollment) {
    return res.status(400).json({ error: "Student already enrolled" });
  }
  next();
};

export const isAlreadyOn3Courses = async (req, res, next) => {
  const { student } = req.body;

  const totalEnrollments = await Enrollment.countDocuments({
    email: student,
    tp_status: true,
  });
  if (totalEnrollments >= 3) {
    return res
      .status(400)
      .json({ error: "Student is already enrolled on 3 courses" });
  }
  next();
};
