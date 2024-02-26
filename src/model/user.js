import Course from './course.js';
import { model, Schema } from 'mongoose';
import Enrollment from "./enrollment.js";

const userSchema = new Schema({
    name: { required: true, type: String },
    email: { required: true, type: String },
    password: { required: true, type: String },
    tp_status: { required: true, type: Boolean, default: true },
    role: {
        type: String,
        enum: ['TEACHER', 'STUDENT'],
        required: true,
    },
});

userSchema.statics.getCoursesTaughtByUser = function (userId) {
    return Course.find({ teacher: userId, tp_status: true});
};

userSchema.statics.getCoursesEnrolledByUser = async function (userId) {
    const enrollments = await Enrollment.find({ student: userId, tp_status: true});
    console.log({enrollments});
    return Course.find({ _id: { $in: enrollments.map(e => e.course) } });
}

export default model('User', userSchema);