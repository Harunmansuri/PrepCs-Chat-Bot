import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import chatbotRoutes from "./routes/chatbot.route.js";

dotenv.config();

const app = express();

// -------------------- Middleware --------------------
app.use(cors({
  origin: [
    "https://prep-cs-chat-bot.vercel.app",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST"]
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// -------------------- Database --------------------
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected ✅");
  })
  .catch((err) => {
    console.error("MongoDB Error ❌", err);
  });

// -------------------- Routes --------------------
app.get("/", (req, res) => {
  res.send("API is running on Vercel 🚀");
});

app.use("/bot/v1", chatbotRoutes);

// ❌ VERCEL PAR LISTEN NAHI LAGATE
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

export default app;
