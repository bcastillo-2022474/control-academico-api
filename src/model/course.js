import { model, Schema } from "mongoose";

const courseSchema = new Schema({
  title: { required: true, type: String },
  description: { required: true, type: String },
  tp_status: { required: true, type: Boolean, default: true },
  teacher: {
    id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
});

export default model("Course", courseSchema);
