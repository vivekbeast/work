import mongoose, { models, Schema } from "mongoose";


const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true, // Ensure company name is mandatory
    },
  },
  {
    timestamps: true,
  }
);


const User = models.User || mongoose.model('User', userSchema);

export default User;
