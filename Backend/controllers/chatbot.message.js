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
      "what can you do": "I can chat, answer questions, and help you learn.",

      "what is python":
        "Python is a high-level programming language known for simplicity.",

      "what is java":
        "Java is a platform-independent object-oriented language.",

      "what is recursion":
        "Recursion is when a function calls itself until a base condition.",

      "who is prime minister of india":
        "Narendra Modi is the Prime Minister of India.",

      "what is g20": "G20 is a group of 20 major economies.",

      "what is oop": "OOP stands for Object Oriented Programming.",

      "what is a class": "A class is a blueprint for creating objects.",

      "what is an object": "An object is an instance of a class.",

      "what is dns": "DNS converts domain names into IP addresses.",

      "What is a Computer Network?":
        "A computer network is a group of devices connected to share data and resources.",

      "What are the types of networks?":
        "LAN, MAN, and WAN are the main types of networks.",

      "What is LAN?":
        "LAN connects computers within a small area like a home, office, or school.",

      "What is WAN?":
        "WAN covers a very large geographical area such as countries or continents.",

      "What is the OSI model?":
        "OSI model is a 7-layer reference model that explains data communication in networks.",

      "Name the 7 layers of OSI model.":
        "Physical, Data Link, Network, Transport, Session, Presentation, Application.",

      "What is TCP?":
        "TCP is a connection-oriented protocol that provides reliable data transfer.",

      "What is UDP?":
        "UDP is a connectionless protocol that is faster but less reliable.",

      "What is an IP address?":
        "An IP address is a unique identifier assigned to a device on a network.",

      "What is DNS?": "DNS converts domain names into IP addresses.",
      
  "What is an Operating System?": "An Operating System is system software that manages computer hardware and software resources.",

  "What are the main functions of OS?": "Process management, memory management, file management, and device management.",

  "What is a process?": "A process is a program that is currently in execution.",

  "What is a thread?": "A thread is a lightweight process that shares memory with other threads.",

  "Difference between process and thread?": "A process has its own memory, while a thread shares memory within the process.",

  "What is CPU scheduling?": "CPU scheduling decides which process will get the CPU at a given time.",

  "What is deadlock?": "Deadlock is a situation where processes wait indefinitely for resources.",

  "What is virtual memory?": "Virtual memory allows programs to run even if physical memory is not enough.",

  "What is paging?": "Paging divides memory into fixed-size blocks called pages.",

  "What is a system call?": "A system call allows user programs to request services from the operating system.",
  "What is OOP?": "OOP is Object Oriented Programming. It is a programming paradigm that revolves around objects which contain data and methods.",

  "What is a class?": "A class is a blueprint or template used to create objects.",

  "What is an object?": "An object is an instance of a class that represents a real-world entity.",

  "What are the four pillars of OOP?": "The four pillars of OOP are Encapsulation, Abstraction, Inheritance, and Polymorphism.",

  "What is Encapsulation?": "Encapsulation means binding data and methods together and protecting data from outside access.",

  "What is Abstraction?": "Abstraction means hiding internal implementation details and showing only important features.",

  "What is Inheritance?": "Inheritance allows one class to acquire properties and methods of another class.",

  "What is Polymorphism?": "Polymorphism means one method can perform different tasks based on the situation.",

  "What is a constructor?": "A constructor is a special method that is automatically called when an object is created.",

  "Difference between class and object?": "A class is a blueprint, while an object is an instance of the class.",
  "what is sdlc?": "SDLC stands for Software Development Life Cycle. It is a process used to develop software in a structured and systematic way.",

  "why is sdlc important?": "SDLC is important because it helps in building high quality software on time and within budget.",

  "what are the phases of sdlc?": "The main phases of SDLC are Requirement Analysis, Design, Development, Testing, Deployment, and Maintenance.",

  "what is requirement analysis in sdlc?": "Requirement analysis is the phase where user needs and system requirements are collected and analyzed.",

  "what is system design in sdlc?": "System design defines the architecture, components, modules, and data flow of the software.",

  "what is development phase in sdlc?": "In the development phase, actual coding of the software is done based on the design documents.",

  "what is testing phase in sdlc?": "Testing phase ensures that the software works correctly and is free from bugs.",

  "what is deployment in sdlc?": "Deployment is the phase where the software is released to the users or production environment.",

  "what is maintenance in sdlc?": "Maintenance involves fixing bugs, improving performance, and updating the software after deployment.",

  "what is sdlc model?": "An SDLC model is a framework that defines how the software development process is organized.",

  "what is waterfall model?": "Waterfall model is a linear SDLC model where each phase is completed before moving to the next phase.",

  "what are the advantages of waterfall model?": "Waterfall model is simple, easy to understand, and suitable for small projects with fixed requirements.",

  "what are the disadvantages of waterfall model?": "Waterfall model is not flexible and changes are difficult once development starts.",

  "what is agile model?": "Agile model is an iterative SDLC model that focuses on continuous development and customer feedback.",

  "why agile is better than waterfall?": "Agile is better because it allows changes, faster delivery, and continuous improvement.",

  "what is spiral model?": "Spiral model combines iterative development with risk analysis at each phase.",

  "what is v-model in sdlc?": "V-model is an SDLC model where testing is planned in parallel with development.",

  "what is prototype model?": "Prototype model creates an early version of the software to understand user requirements better.",

  "what is feasibility study in sdlc?": "Feasibility study checks whether the project is technically, economically, and operationally possible.",

  "what is documentation in sdlc?": "Documentation is the process of creating written details about software design, code, and usage."
    };

    // ---------------- Response Logic ----------------
    const botText =
      botResponses[normalizedText] || "Sorry, I don't understand this yet.";

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
   
    return res.status(500).json({ error: "Internal server error" });
  }
};
