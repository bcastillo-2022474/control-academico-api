import mongoose from 'mongoose';
import Course from './course.js';
const {Schema} = mongoose;

const userSchema = new Schema({
    name: {required: true, type: String},
    email: {required: true, type: String},
    password: {required: true, type: String},
    // status of the existance of this tuple/register
    tp_status: {
        required: true, type: Boolean, default: true
    },
    role: {
        type: String,
        enum: ['ADMIN_ROLE', 'STUDENT_ROLE']
    }
});

userSchema.statics.getCoursesEnrolledByUser = async function (userId) {
    try {
        // Import the Course model only when needed
        const courses = await Course.find({'students.id': userId});
        console.log(courses)
        return courses;
    } catch (error) {
        console.log(error)
        throw new Error('Error retrieving user and courses');
    }
}

userSchema.statics.getCoursesTaughtByUser = async function (userId) {
    try {
        // Import the Course model only when needed
        const teacher = await Course.find({'teacher.id': userId});
        console.log(teacher)
        return teacher;
    } catch (error) {
        console.log(error)
        throw new Error('Error retrieving user and courses');
    }
}

userSchema.methods.getRoleDetails = async function () {
    console.log(this.role);
    if (this.role === 'ADMIN_ROLE') {
        try {
            console.log(this._id);
            return {
                assignedCourses: await userSchema.statics.getCoursesTaughtByUser(this._id.toString())
            };
        } catch (error) {
            console.log(error);
            throw new Error('Error retrieving assigned courses for admin');
        }
    }

    if (this.role === 'STUDENT_ROLE') {
        try {
            return {
                courses: await userSchema.statics.getCoursesEnrolledByUser(this._id.toString())
            };
        } catch (error) {
            throw new Error('Error retrieving enrolled courses for student');
        }
    }
};


export default mongoose.model('User', userSchema);