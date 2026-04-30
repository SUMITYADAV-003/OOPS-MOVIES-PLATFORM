import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Usernaem is required "],
    unique: true,
     trim: true, 
    minlength: [3, "Username must be at least 3 characters"],
  },
  email: {
    type: String,
    required: [true, "email is required "],
    unique: true,
    trim: true,
    lowercase: true,
    
  },
  password: {
    type: String,
    required: [true, "password is required"],
     minlength: [6, "Password must be at least 6 characters"]
  },
   role: {
      type: String,
      enum: ["user", "admin"],   // ← needed for your Admin Panel feature
      default: "user",
    },
}, { timestamps: true,})

const userModel = mongoose.model("users", userSchema);

export default userModel;



