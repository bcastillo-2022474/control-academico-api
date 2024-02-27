import { model, Schema } from "mongoose";

const enrollmentSchema = new Schema({
  student: {
    id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  course: {
    id: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  tp_status: { required: true, type: Boolean, default: true },
});

export default model("Enrollment", enrollmentSchema);
