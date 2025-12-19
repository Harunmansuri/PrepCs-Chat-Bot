import User from "../models/user.model.js";
import Bot from "../models/bot.model.js";

export const Message = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ error: "Text is required" });
    }

    // ---------------- Save User Message ----------------
    const user = await User.create({
      Sender: "user",
      text: text.trim(),
    });

    // ---------------- Normalize Input ----------------
    const normalizedText = text
      .toLowerCase()
      .replace(/[?.!,]/g, "")
      .trim();

    // ---------------- Bot Responses ----------------
    const botResponses = {
      hello: "Hi! How can I help you?",
      "can we become friend": "Yes 😊",
      "how are you": "I'm doing great! How about you?",
      "what is your name": "I’m BotSpoof, your virtual assistant.",
      "who made you": "I was created by developers to help you.",
      "tell me a joke":
        "Why don’t skeletons fight each other? They don’t have the guts!",
      "what is the time": "I can’t see a clock, but your device can!",
      bye: "Goodbye! Have a great day 👋",
      "thank you": "You’re welcome!",
      "i love you": "That’s sweet ❤️",
      "where are you from": "I live in the cloud ☁️",
      "what can you do":
        "I can chat, answer questions, and help you learn.",

      "what is python":
        "Python is a high-level programming language known for simplicity.",

      "what is java":
        "Java is a platform-independent object-oriented language.",

      "what is recursion":
        "Recursion is when a function calls itself until a base condition.",

      "who is prime minister of india":
        "Narendra Modi is the Prime Minister of India.",

      "what is g20":
        "G20 is a group of 20 major economies.",

      "what is oop":
        "OOP stands for Object Oriented Programming.",

      "what is a class":
        "A class is a blueprint for creating objects.",

      "what is an object":
        "An object is an instance of a class.",

      "what is dns":
        "DNS converts domain names into IP addresses.",
    };

    // ---------------- Response Logic ----------------
    const botText =
      botResponses[normalizedText] ||
      "Sorry, I don't understand this yet.";

    // ---------------- Save Bot Message ----------------
    const bot = await Bot.create({
      Sender: "bot",
      text: botText,
    });

    // ---------------- Final Response ----------------
    return res.status(200).json({
      userMessage: user.text,
      botMessage: bot.text,
    });
  } catch (error) {
    console.error("Chatbot Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
