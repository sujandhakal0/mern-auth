import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePhoto: {
      type: String,
      default:
        "https://cdn.dribbble.com/users/5534/screenshots/14230133/profile_4x.jpg",
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
export default User;
