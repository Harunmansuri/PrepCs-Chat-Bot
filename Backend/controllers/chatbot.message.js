import User from "../models/user.model.js";
import Bot from "../models/bot.model.js";

export const Message = async (req, res) => {
  try {
    const { text } = req.body;

    console.log("User Input:", text);

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
      .replace(/[?.!,]/g, "") // 🔥 remove punctuation
      .trim();

    console.log("Normalized:", normalizedText);

    // ---------------- Bot Responses (NO ? marks) ----------------
    const botResponses = {
      "hello": "Hi there! How can I assist you today?",

      "what is oop":
        "OOP is Object Oriented Programming. It is a programming paradigm that revolves around objects which contain data and methods.",

      "what is a class":
        "A class is a blueprint or template used to create objects.",

      "what is an object":
        "An object is an instance of a class that represents a real-world entity.",

      "what are the four pillars of oop":
        "The four pillars of OOP are Encapsulation, Abstraction, Inheritance, and Polymorphism.",

      "what is encapsulation":
        "Encapsulation means binding data and methods together and protecting data from outside access.",

      "what is abstraction":
        "Abstraction means hiding internal implementation details and showing only important features.",

      "what is inheritance":
        "Inheritance allows one class to acquire properties and methods of another class.",

      "what is polymorphism":
        "Polymorphism means one method can perform different tasks based on the situation.",

      "what is a constructor":
        "A constructor is a special method that is automatically called when an object is created.",

      "difference between class and object":
        "A class is a blueprint, while an object is an instance of the class.",

      "what is an operating system":
        "An Operating System is system software that manages computer hardware and software resources.",

      "what is cpu scheduling":
        "CPU scheduling decides which process will get the CPU at a given time.",

      "what is deadlock":
        "Deadlock is a situation where processes wait indefinitely for resources.",

      "what is virtual memory":
        "Virtual memory allows programs to run even if physical memory is not enough.",

      "what is paging":
        "Paging divides memory into fixed-size blocks called pages.",

      "what is a computer network":
        "A computer network is a group of devices connected to share data and resources.",

      "what is tcp":
        "TCP is a connection-oriented protocol that provides reliable data transfer.",

      "what is udp":
        "UDP is a connectionless protocol that is faster but less reliable.",

      "what is dns":
        "DNS converts domain names into IP addresses."
    };

    // ---------------- Response Logic ----------------
    const botText =
      botResponses[normalizedText] ||
      "Sorry, I don't understand this question yet.";

    // ---------------- Save Bot Message ----------------
    const bot = await Bot.create({
      Sender: "bot",
      text: botText,
    });

    // ---------------- Final Response ----------------
    return res.status(200).json({
      UserMessage: user.text,
      BotMessage: bot.text,
    });

  } catch (error) {
    console.error("Chatbot Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
