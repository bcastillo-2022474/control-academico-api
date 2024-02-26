function validateRole(role) {
    return (req, res, next) => {
        const {user} = req
        if (user.role !== role) {
            return res.status(401).json({error: 'Unauthorized'})
        }

        next()
    }
}

export const validateIsTeacher = validateRole('teacher')
export const validateIsStudent = validateRole('student')

export const validateIsTeacherOrEnrollingStudent = async (req, res) => {
    // check is either teacher or the student that is about to be enrolled
    const {role, _id} = req.user;
    const {student} = req.body
    if (role !== 'teacher' && student !== _id.toString()) {
        return res.status(401).json({error: 'Unauthorized'})
    }
    next()
}