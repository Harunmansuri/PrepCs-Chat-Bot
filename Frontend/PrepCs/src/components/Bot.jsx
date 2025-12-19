import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const Bot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef(null);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput("");
    setIsLoading(true);

    // show user message immediately
    setMessages((prev) => [...prev, { text: userText, sender: "user" }]);

    try {
      const res = await axios.post(
        "http://localhost:4000/bot/v1/message",
        { text: userText },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("API RESPONSE 👉", res.data);

      // 🔥 SAFE BOT MESSAGE PICK (fix)
      const botReply =
        res.data?.botMessage ||
        res.data?.message ||
        res.data?.reply ||
        res.data?.data ||
        "Bot replied but message format unknown";

      setMessages((prev) => [...prev, { text: botReply, sender: "bot" }]);
    } catch (error) {
      console.error("API ERROR 👉", error.response || error.message);

      setMessages((prev) => [
        ...prev,
        {
          text:
            error.response?.data?.error ||
            error.response?.data?.message ||
            "Backend error: check server",
          sender: "bot",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen bg-[#ece5dd]">
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full bg-gray-900 px-8 py-5 flex justify-between items-center text-white z-50">
        <h1 className="font-bold text-2xl">PrepCs</h1>
        <h1 className="font-bold text-xl">UserName</h1>
      </header>

      {/* CHAT */}
      <main className="pt-28 pb-28 flex justify-center">
        <div className="w-full max-w-4xl px-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex mb-3 ${
                message.sender === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 max-w-[70%] text-sm rounded-2xl shadow ${
                  message.sender === "user"
                    ? "bg-[#dcf8c6] text-black rounded-br-none"
                    : "bg-white text-black rounded-bl-none"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start mb-3">
              <div className="bg-white px-4 py-2 rounded-2xl shadow text-sm">
                typing...
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </main>

      {/* FOOTER */}
      <footer className="fixed bottom-0 left-0 w-full bg-white border-t p-4">
        <div className="max-w-4xl mx-auto relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            className="w-full pr-28 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />

          <button
            onClick={handleSendMessage}
            disabled={isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Bot;
