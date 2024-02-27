function validateRole(role) {
  return (req, res, next) => {
    const { user } = req;
    if (user.role !== role) {
      return res
        .status(401)
        .json({ error: `Unauthorized, user must be of type ${role}` });
    }

    next();
  };
}

export const validateIsTeacher = validateRole("TEACHER");
export const validateIsStudent = validateRole("STUDENT");

export const validateIsTeacherOrEnrollingStudent = async (req, res, next) => {
  // check is either TEACHER type role or the student that is about to be enrolled
  const { role, email } = req.user;
  const { student } = req.body;
  console.log({ student, email });
  console.log(student === email);
  if (student !== email && role !== "TEACHER") {
    return res.status(401).json({
      error:
        "Unauthorized, must be either a TEACHER, or the student about to be enrolled," +
        " check that you are logged in as the correct user.",
    });
  }
  next();
};
