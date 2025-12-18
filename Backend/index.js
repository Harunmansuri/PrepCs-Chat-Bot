import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import chatbotRoutes from "./routes/chatbot.route.js";

dotenv.config();
const app = express();

// -------------------- Config --------------------
const PORT = process.env.PORT || 4002;

// -------------------- Middleware --------------------
app.use(express.json()); // read JSON body
app.use(express.urlencoded({ extended: true })); // read form data

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
