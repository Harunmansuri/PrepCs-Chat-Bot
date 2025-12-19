import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import chatbotRoutes from "./routes/chatbot.route.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;
// -------------------- Middleware --------------------
app.use(express.json()); // read JSON body
app.use(express.urlencoded({ extended: true })); // read form data
// -------------------- Config --------------------
app.use(cors());

// -------------------- Database --------------------

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });
//defining routes
app.use("/bot/v1/", chatbotRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
