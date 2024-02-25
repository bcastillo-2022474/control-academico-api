import {model, Schema} from "mongoose";
import User from "./user.js";

const CourseSchema = new Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    tp_status: {
        required: true,
        type: Boolean,
        default: true
    },
    teacher: {
        // Embed the teacher details directly in the Course schema
        name: {type: String, required: true},
        email: {type: String, required: true},
        id: {type: Schema.Types.ObjectId, required: true}
    },
    students: {
        type: [
            {
                name: {type: String, required: true},
                email: {type: String, required: true},
                id: {type: Schema.Types.ObjectId, required: true}
            }
        ],
    }
});

export default model('Course', CourseSchema);
