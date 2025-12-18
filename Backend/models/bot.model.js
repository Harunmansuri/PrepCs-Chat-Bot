import mongoose from "mongoose";
const botschema = new mongoose.Schema({
  text: { type: String, required: true },
  timestamps: { type: Date, default: Date.now },
});

const Bot = mongoose.model("Bot", botschema);
export default Bot;
