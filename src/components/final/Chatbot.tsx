
"use client";

import { Bot, MessageSquare, Send, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { chatbotData } from "./chatbotData";

interface ChatMessage {
  role: "user" | "model";
  text: string;
}

const Chatbot: React.FC = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([{ role: "model", text: chatbotData }]);
  const [showChatBot, setShowChatBot] = useState<boolean>(false);
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const chatBodyRef = useRef<HTMLDivElement | null>(null);
  const [inputValue, setInputValue] = useState<string>("");

  const generateBotResponse = async (history: ChatMessage[]) => {
    setIsThinking(true);
    const updatedHistory = history.map(({ role, text }) => ({
      role,
      parts: [{ text }],
    }));

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAHygzhpSGaLo2ZiqkoLeORfa_a9iugEf0`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: updatedHistory }),
        }
      );

      if (!response.ok) throw new Error("API request failed");

      const data = await response.json();
      const botReply: string =
        data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "Sorry, I couldn't process that.";

      setChatHistory((prev) => [...prev, { role: "model", text: botReply }]);
    } catch (error) {
      console.error("Error fetching bot response:", error);
      setChatHistory((prev) => [...prev, { role: "model", text: "Error: Unable to process your request." }]);
    } finally {
      setIsThinking(false);
    }
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatHistory, isThinking]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = inputValue.trim();
    setInputValue("");

    setChatHistory((history) => [...history, { role: "user", text: userMsg }]);

    setTimeout(() => {
      generateBotResponse([
        ...chatHistory,
        {
          role: "user",
          text: `Using the details provided above, please address this query: ${userMsg}`,
        },
      ]);
    }, 600);
  };

  return (
    <div className="fixed bottom-10 right-14">
      <button
        onClick={() => setShowChatBot((prev) => !prev)}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white shadow-lg hover:bg-red-700"
      >
        {showChatBot ? <X size={28} /> : <MessageSquare size={28} />}
      </button>

      {showChatBot && (
        <div className="fixed bottom-24 right-5 w-96 overflow-hidden rounded-lg bg-gray-700 p-6 shadow-xl">
          <div className="flex items-center justify-between border-b pb-4 text-white">
            <div className="flex items-center gap-3">
              <Bot size={28} />
              <span className="text-lg font-semibold text-red-700">PLUTUS Chatbot</span>
            </div>
            <button onClick={() => setShowChatBot(false)}>
              <X size={24} />
            </button>
          </div>

          <div ref={chatBodyRef} className="scrollbar-none h-[400px] space-y-4 overflow-y-auto p-4">
            {chatHistory.map((chat, index) => (
              <div key={index} className={`flex flex-col ${chat.role === "model" ? "items-start" : "items-end"} gap-3`}>
                {chat.role === "model" && (
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600 p-2 text-white">
                    <Bot size={20} />
                  </span>
                )}
                <p
                  className={`max-w-[85%] whitespace-pre-line rounded-lg px-5 py-4 text-base text-white ${chat.role === "model" ? "rounded-tl-none bg-gray-600" : "rounded-tr-none bg-gray-500"
                    } overflow-hidden`}
                >
                  {chat.text}
                </p>
              </div>
            ))}
            {isThinking && (
              <div className="flex flex-col items-start gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600 p-2 text-white">
                  <Bot size={20} />
                </span>
                <p className="max-w-[85%] whitespace-pre-line rounded-lg rounded-tl-none bg-gray-600 px-5 py-4 text-base text-white">
                  Thinking...
                </p>
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-3 flex items-center rounded-2xl bg-gray-600 text-white outline outline-1 outline-red-500 focus-within:outline-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="h-14 w-full border-none bg-transparent px-5 py-3 text-base outline-none"
              placeholder="Message..."
              required
            />
            {inputValue && (
              <button
                type="submit"
                className="mr-3 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-600 text-lg text-white outline-none transition-all hover:bg-red-700"
              >
                <Send size={22} />
              </button>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;