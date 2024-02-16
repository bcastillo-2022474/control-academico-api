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
  const { role, _id } = req.user;
  const { student } = req.body;
  if (role !== "TEACHER" && student !== _id.toString()) {
    return res.status(401).json({
      error:
        "Unauthorized, must be either a TEACHER, or the student about to be enrolled," +
        " check that you are logged in as the correct user.",
    });
  }
  next();
};
