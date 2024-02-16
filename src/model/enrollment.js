import { model, Schema } from 'mongoose';

const enrollmentSchema = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    tp_status: { required: true, type: Boolean, default: true },
});

export default model('Enrollment', enrollmentSchema);
