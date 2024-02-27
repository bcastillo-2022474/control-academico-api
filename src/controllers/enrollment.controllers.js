import Enrollment from "../model/enrollment.js";
import User from "../model/user.js";
import Course from "../model/course.js";

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
  const { course: courseId } = req.params;
  // Email of the student
  const email = req.body.student;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({ error: "No User with that element" });
  }

  const student = { email, id: user._id };
  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(404).json({ error: "Curso no encontrado" });
  }

  console.log("WORKING");
  const enrollment = new Enrollment({
    course: { id: course._id, name: course.title },
    student,
  });
  await enrollment.save();
  console.log("DELETE");
  res.status(201).json(enrollment);
};

export const unenrollStudentFromCourse = async (req, res) => {
  const { course: courseId } = req.params;
  console.log({ courseId });
  // unenroll a student from a course
  const { student } = req.body;

  const user = (await User.findOne({ email: student }))?.toObject();
  const course = (await Course.findById(courseId))?.toObject();

  console.log(user, course);

  if (!user) return res.status(404).json({ error: "User not found" });
  if (!course) return res.status(404).json({ error: "Course not found" });

  console.log({
    course: { id: course._id, name: course.title },
    student: { email: user.email, id: user._id },
    tp_status: true,
  });

  const enrollment = await Enrollment.findOneAndUpdate(
    {
      "course.id": courseId,
      "student.id": user._id,
      tp_status: true,
    },
    { tp_status: false },
  );

  console.log(enrollment);

  if (!enrollment) {
    return res.status(404).json({ error: "Student is not enrolled on course" });
  }
  res.status(200).json(enrollment);
};
