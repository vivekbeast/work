import mongoose, { models, Schema } from "mongoose";
import { type } from "os";

const TaskSchema = new Schema(
  {
    taskDate: { type: Date, required: true },
    submissionDate: { type: Date, required: true },
    taskDescription: { type: String, required: true },
    taskName: { type: String, required: true },
    status: { type: String }
  },
  { timestamps: true }
);

const SubuserFormSchema = new Schema(
  {
    userId: { type: String, required: true, unique: true },
    tasks: [TaskSchema],
  },
  { timestamps: true }
);

const SubuserForm = models.SubuserForm || mongoose.model("SubuserForm", SubuserFormSchema);

export default SubuserForm;




// import mongoose, { models, Schema } from "mongoose";

// const subuserFormSchema = new Schema(
//   {
//     userId: {
//       type: String,
//       required: true,
//     },
//     taskDate: {
//       type: Date,
//       required: true,
//     },
//     submissionDate: {
//       type: Date,
//       required: true,
//     },
//     taskDescription: {
//       type: String,
//       required: true,
//     },
//     // uploadedImages: {
//     //   type: [String],
//     //   validate: {
//     //     validator: function (value) {
//     //       return value.every((uri) => /^(https?|ftp):\/\/.+/.test(uri));
//     //     },
//     //     message: "All uploaded images must be valid URIs."
//     //   },
//     // },
//   },
//   {
//     timestamps: true,
//   }
// );

// const SubuserForm = models.SubuserForm || mongoose.model("SubuserForm", subuserFormSchema);

// export default SubuserForm;
