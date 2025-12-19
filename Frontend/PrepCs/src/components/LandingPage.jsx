import React from "react";
import { Bot, MessageSquare, Shield, Zap, Github, Linkedin, Twitter, Code, Book, UserCircle } from "lucide-react";

export default function LandingPage() {
  const goToChat = () => {
    window.location.href = "/chat";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white">

      {/* Navbar */}
      <nav className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-5 gap-4 md:gap-0">
        <div className="flex items-center gap-2 text-xl md:text-2xl font-extrabold text-purple-500">
          <Bot className="text-purple-500" />
          <span className="text-purple-400 text-3xl md:text-4xl font-bold">prepcs</span>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-sm text-zinc-300 font-semibold">
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#how" className="hover:text-white">How it works</a>
          <a href="#contact" className="hover:text-white">Contact</a>
        </div>
        <button
          onClick={goToChat}
          className="bg-purple-600 hover:bg-purple-700 transition px-5 py-2 rounded-xl text-sm font-medium"
        >
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight">
            Prepare your CS subjects <br /> with prepcs
          </h1>
          <p className="mt-4 md:mt-6 text-zinc-300 max-w-xl text-sm sm:text-base md:text-lg">
            Ask CS questions and prepare for interviews in DSA, OS, DBMS, CN, and more.
          </p>
          <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-4">
            <button
              onClick={goToChat}
              className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-2xl font-medium text-sm sm:text-base"
            >
              Open Chat
            </button>
          </div>
        </div>

        <div className="relative w-full md:w-auto">
          <div className="absolute inset-0 bg-purple-600/20 blur-3xl rounded-full" />
          <div className="relative bg-zinc-900 border border-zinc-700 rounded-3xl p-4 sm:p-6 shadow-xl">
            <p className="text-sm text-zinc-400">AI Assistant</p>
            <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
              <div className="bg-zinc-800 p-2 sm:p-3 rounded-xl w-fit text-sm sm:text-base">Hi 👋 How can I help you?</div>
              <div className="bg-purple-600 p-2 sm:p-3 rounded-xl w-fit ml-auto text-sm sm:text-base">Explain binary search</div>
              <div className="bg-zinc-800 p-2 sm:p-3 rounded-xl w-fit text-sm sm:text-base">
                Binary search is a divide-and-conquer algorithm to find an element in a sorted array.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">Why Choose prepcs?</h2>
        <div className="mt-10 md:mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          <Feature
            icon={<Zap className="text-purple-500" />}
            title="Fast Responses"
            desc="Get answers instantly for any CS topic."
          />
          <Feature
            icon={<Shield className="text-purple-500" />}
            title="Secure"
            desc="Your learning data is safe and private."
          />
          <Feature
            icon={<MessageSquare className="text-purple-500" />}
            title="Easy to Use"
            desc="Click on chat, ask questions, and start learning immediately."
          />
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="bg-zinc-950 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">How It Works</h2>
          <div className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10 text-center">
            <Step number="1" title="Open Chat" desc="Visit the website and click on the chat button to start." />
            <Step number="2" title="Ask Questions" desc="Ask any CS question like DSA, OS, DBMS, or CN." />
            <Step number="3" title="Prepare for Interviews" desc="Get clear explanations and prepare for CS interviews." />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-zinc-800 py-12 md:py-16 text-zinc-400">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-white">Help us improve prepcs 🚀</h3>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base">
            Suggest subjects or topics you want us to add for CS interview preparation.
          </p>

          <form
            className="mt-6 sm:mt-8 max-w-xl mx-auto flex flex-col gap-3 sm:gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              const subject = e.target.subject.value;
              const message = e.target.message.value;
              window.location.href = `mailto:digitalharun9617@gmail.com?subject=prepcs Suggestion: ${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
            }}
          >
            <input
              name="subject"
              type="text"
              required
              placeholder="e.g. Operating Systems, DBMS, System Design"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl bg-zinc-900 border border-zinc-700 focus:outline-none focus:border-purple-600 text-white text-sm sm:text-base"
            />
            <textarea
              name="message"
              rows="4"
              required
              placeholder="Any specific topics or questions you want us to cover?"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl bg-zinc-900 border border-zinc-700 focus:outline-none focus:border-purple-600 text-white text-sm sm:text-base"
            ></textarea>
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 transition px-5 sm:px-6 py-2 sm:py-3 rounded-xl font-medium text-white text-sm sm:text-base"
            >
              Submit Suggestion
            </button>
          </form>

          <p className="mt-6 md:mt-8 text-lg font-bold text-purple-400">Developed by Harun Mansuri</p>

          <div className="mt-4 flex justify-center gap-4 flex-wrap">
            <DynamicSocialCircle link="https://github.com/Harunmansuri" icon={<Github />} />
            <DynamicSocialCircle link="https://www.linkedin.com/in/harun-mansuri" icon={<Linkedin />} />
            <DynamicSocialCircle link="https://x.com/Harunmansuri961" icon={<Twitter />} />
            <DynamicSocialCircle link="https://leetcode.com/harunmansuri1" icon={<Code />} />
            <DynamicSocialCircle link="https://www.geeksforgeeks.org/user/mrharunmansuri/" icon={<Book />} />
            <DynamicSocialCircle link="https://harunmansuri.vercel.app/" icon={<UserCircle />} />
          </div>

          <p className="mt-6 md:mt-10 text-xs sm:text-sm text-zinc-500">
            © 2025 prepcs. Built with React & Tailwind.
          </p>
        </div>
      </footer>
    </div>
  );
}

// Features Component
function Feature({ icon, title, desc }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 text-center hover:border-purple-600 transition">
      <div className="flex justify-center mb-3 sm:mb-4">{icon}</div>
      <h3 className="text-lg sm:text-xl font-semibold">{title}</h3>
      <p className="mt-2 sm:mt-3 text-zinc-400 text-sm sm:text-base">{desc}</p>
    </div>
  );
}

// Step Component
function Step({ number, title, desc }) {
  return (
    <div>
      <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-purple-600 font-bold text-sm sm:text-base">
        {number}
      </div>
      <h3 className="mt-2 sm:mt-4 text-lg sm:text-xl font-semibold">{title}</h3>
      <p className="mt-1 sm:mt-2 text-zinc-400 text-sm sm:text-base">{desc}</p>
    </div>
  );
}

// Dynamic Social Circle
function DynamicSocialCircle({ link, icon }) {
  const colors = ["bg-purple-600", "bg-blue-600", "bg-green-600", "bg-red-600", "bg-yellow-600", "bg-pink-600"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className={`w-12 h-12 flex items-center justify-center rounded-full ${randomColor} hover:scale-110 transition transform text-white`}>{icon}</a>
  );
}
