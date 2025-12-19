import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  Sender: { type: String, required: true, enum: ["user"] },
  text: { type: String, required: true },
  timestamps: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
export default User;