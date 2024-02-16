import Course from "../model/course.js";
import Enrollment from "../model/enrollment.js";

export const getAllCourses = async (req, res) => {
  const { page = 0, limit = 10 } = req.query;

  const query = { tp_status: true };
  const [total, courses] = await Promise.all([
    Course.countDocuments(query),
    Course.find(query)
      .limit(limit)
      .skip(page * limit),
  ]);

  res.status(200).json({ total, courses });
};

export const postCourse = async (req, res) => {
  const { title, description, teacher } = req.body;
  const course = new Course({ title, description, teacher });

  await course.save();
  res.status(201).json(course);
};

export const getCourseById = async (req, res) => {
  const { id } = req.params;
  const course = await Course.findById(id);

  if (!course) {
    return res.status(404).json({ error: "Course not found" });
  }

  res.status(200).json(course);
};

export const updateCourseById = async (req, res) => {
  const { id } = req.params;
  const { title, description, teacher } = req.body;
  const course = await Course.findByIdAndUpdate(id, {
    title,
    description,
    teacher,
  });
  if (!course) {
    return res.status(404).json({ error: "Course not found" });
  }

  res.status(200).json({
    ...course._doc,
    title: title || course._doc.title,
    description: description || course._doc.description,
    teacher: teacher || course._doc.teacher,
  });
};

export const deleteCourseById = async (req, res) => {
  const { id } = req.params;
  const course = await Course.findByIdAndUpdate(id, { tp_status: false });

  if (!course) {
    return res.status(404).json({ error: "Course not found" });
  }
  // delete all enrollments for this course
  Enrollment.findOneAndUpdate(
    { course: id },
    { tp_status: false },
    { multi: true },
  );
  res.status(200).json(course);
};
