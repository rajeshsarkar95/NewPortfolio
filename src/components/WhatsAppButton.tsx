"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, Sparkles, User } from "lucide-react";

interface GeminiChatButtonProps {
  defaultPrompt?: string;
}

interface Message {
  role: "user" | "ai";
  text: string;
}

export default function GeminiChatButton({
  defaultPrompt = "",
}: GeminiChatButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState(defaultPrompt);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: "Hi 👋 I am Rajesh's AI assistant. Ask me about projects, skills, experience, or anything about this portfolio.",
    },
  ]);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  const handleAskGemini = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!prompt.trim() || loading) return;

    const userMessage = prompt;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userMessage,
      },
    ]);

    setPrompt("");
    setLoading(true);

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: userMessage,
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: data.text || "No response generated.",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "⚠️ Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Chat"
        className="
          fixed bottom-6 right-6
          w-14 h-14
          rounded-full
          bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600
          hover:from-blue-500 hover:to-violet-500
          text-white
          shadow-lg shadow-blue-500/30
          hover:shadow-blue-500/50
          flex items-center justify-center
          z-50
          transition-all duration-300 ease-in-out
          hover:scale-105
          active:scale-95
        "
      >
        {isOpen ? (
          <X className="w-6 h-6 transition-transform duration-300 rotate-90" />
        ) : (
          <MessageSquare className="w-6 h-6" />
        )}
      </button>
      {isOpen && (
        <div
          className="
            fixed
            bottom-24
            right-6
            w-[calc(100vw-3rem)]
            sm:w-[420px]
            h-[560px]
            max-h-[80vh]
            bg-slate-950/90
            backdrop-blur-xl
            border
            border-slate-800/80
            rounded-3xl
            shadow-2xl shadow-black/80
            z-50
            flex
            flex-col
            overflow-hidden
            animate-in fade-in slide-in-from-bottom-4 duration-300
          "
        >
          {/* Glassmorphic Header */}
          <div
            className="
              px-5 py-4
              border-b border-slate-800/80
              bg-slate-900/50
              flex items-center justify-between
            "
          >
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-blue-600/20 border border-blue-500/30">
                <Sparkles className="w-5 h-5 text-blue-400" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-950 rounded-full" />
              </div>

              <div>
                <h2 className="text-white font-semibold text-sm tracking-wide">
                  {"Rajesh's Assistant"}
                </h2>
                <p className="text-xs text-slate-400">Powered by Gemini AI</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-slate-800/50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div
            ref={chatRef}
            className="
              flex-1
              overflow-y-auto
              p-4
              space-y-4
              scrollbar-thin
              scrollbar-thumb-slate-800
              scrollbar-track-transparent
            "
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-2.5 items-end ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role === "ai" && (
                  <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 mb-1">
                    <Bot className="w-4 h-4 text-blue-400" />
                  </div>
                )}

                <div
                  className={`
                    px-4 py-3
                    rounded-2xl
                    max-w-[80%]
                    text-sm
                    leading-relaxed
                    shadow-sm
                    ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-xs"
                        : "bg-slate-900/90 border border-slate-800 text-slate-200 rounded-bl-xs"
                    }
                  `}
                >
                  {msg.text}
                </div>

                {msg.role === "user" && (
                  <div className="w-7 h-7 rounded-full bg-blue-600/30 border border-blue-500/30 flex items-center justify-center shrink-0 mb-1">
                    <User className="w-4 h-4 text-blue-300" />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex gap-2.5 items-end justify-start">
                <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 mb-1">
                  <Bot className="w-4 h-4 text-blue-400" />
                </div>
                <div className="bg-slate-900/90 border border-slate-800 px-4 py-3 rounded-2xl rounded-bl-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                </div>
              </div>
            )}
          </div>

          
          <form
            onSubmit={handleAskGemini}
            className="
              p-3
              bg-slate-900/40
              border-t border-slate-800/80
              flex items-center
              gap-2
            "
          >
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask about projects, skills, background..."
              className="
                flex-1
                bg-slate-900/90
                border border-slate-700/60
                focus:border-blue-500/80
                rounded-xl
                px-4 py-2.5
                text-sm
                text-slate-100
                placeholder-slate-500
                outline-none
                transition-all
              "
            />

            <button
              type="submit"
              disabled={loading || !prompt.trim()}
              className="
                bg-blue-600
                hover:bg-blue-500
                disabled:opacity-50
                disabled:hover:bg-blue-600
                disabled:cursor-not-allowed
                p-2.5
                rounded-xl
                text-white
                transition-all
                shrink-0
                flex items-center justify-center
              "
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}