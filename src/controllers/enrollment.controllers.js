import Enrollment from "../model/enrollment.js";

export const getAllEnrollments = async (req, res) => {
  const { page = 0, limit = 10 } = req.query;

  const query = { tp_status: true };
  const [total, enrollments] = await Promise.all([
    Enrollment.countDocuments(query),
    Enrollment.find(query)
      .limit(limit)
      .skip(page * limit),
  ]);

  res.status(200).json({ total, enrollments });
};

export const enrollStudentToCourse = async (req, res) => {
  // enroll student to a course
  const { course } = req.params;
  const { student } = req.body;
  const enrollment = new Enrollment({ course, student });
  await enrollment.save();
  res.status(201).json(enrollment);
};

export const unenrollStudentFromCourse = async (req, res) => {
  const { course } = req.params;
  // unenroll a student from a course
  const { student } = req.body;
  const enrollment = await Enrollment.findOneAndUpdate(
    { course, student, tp_status: true },
    { tp_status: false },
  );
  if (!enrollment) {
    return res.status(404).json({ error: "Student is not enrolled on course" });
  }
  res.status(200).json(enrollment);
};
