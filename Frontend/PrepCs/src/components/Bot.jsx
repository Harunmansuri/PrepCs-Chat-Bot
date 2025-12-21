import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";



function Bot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    const userText = input;

    // Show user message instantly
    setMessages((prev) => [...prev, { text: userText, sender: "user" }]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${ import.meta.env.VITE_API_URL}/bot/v1/message`,
        { text: userText },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      setMessages((prev) => [
        ...prev,
        { text: res.data.botMessage, sender: "bot" }
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { text: "❌ Server error. Please try again.", sender: "bot" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0d0d0d] text-white">
      
      {/* Header */}
      <header className="fixed top-0 left-0 w-full border-b border-gray-800 bg-[#0d0d0d] z-10">
        <div className="max-w-4xl mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-lg font-bold">PrepCs</h1>
          <FaUserCircle size={30} className="cursor-pointer" />
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto pt-20 pb-24 flex justify-center">
        <div className="w-full max-w-4xl px-4 flex flex-col gap-3">

          {messages.length === 0 && (
            <div className="text-center text-gray-400 text-lg mt-20">
              👋 Hi, I'm <span className="text-green-500 font-semibold">PrepCs Bot</span>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`px-4 py-2 rounded-xl max-w-[75%] break-words
              ${
                msg.sender === "user"
                  ? "bg-blue-600 self-end"
                  : "bg-gray-800 self-start"
              }`}
            >
              {msg.text}
            </div>
          ))}

          {loading && (
            <div className="bg-gray-700 text-gray-300 px-4 py-2 rounded-xl max-w-[60%] self-start">
              ⏳ Bot is typing...
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Footer */}
      <footer className="fixed bottom-0 left-0 w-full border-t border-gray-800 bg-[#0d0d0d]">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex bg-gray-900 rounded-full px-4 py-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask PrepCS..."
              className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 px-2"
            />
            <button
              onClick={handleSendMessage}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded-full font-medium transition disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Bot;
