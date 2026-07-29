"use client";

import React, { useState, useRef, useEffect } from "react";

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
  }, [messages]);
  const handleAskGemini = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!prompt.trim() || loading) return;


    const userMessage = prompt;

    setMessages(prev => [
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
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({
          prompt:userMessage,
        }),
      });


      const data = await res.json();


      setMessages(prev=>[
        ...prev,
        {
          role:"ai",
          text:data.text || "No response generated.",
        },
      ]);


    } catch(error){

      setMessages(prev=>[
        ...prev,
        {
          role:"ai",
          text:"⚠️ Something went wrong.",
        },
      ]);

    } finally{
      setLoading(false);
    }
  };


  return (
    <>
    
    {/* Floating Button */}
    <button
      onClick={()=>setIsOpen(!isOpen)}
      className="
      fixed bottom-5 right-5
      w-14 h-14
      rounded-full
      bg-blue-600
      hover:bg-blue-500
      text-white
      shadow-xl
      flex items-center justify-center
      z-50
      transition
      "
    >

      {isOpen ? (
        <span className="text-2xl">×</span>
      ):(
        <span className="text-xl">💬</span>
      )}

    </button>



    {/* Chat Box */}
    {
    isOpen && (

    <div
    className="
    fixed
    bottom-24
    right-5
    w-[90vw]
    sm:w-[400px]
    h-[520px]
    bg-slate-950
    border
    border-slate-800
    rounded-2xl
    shadow-2xl
    z-50
    flex
    flex-col
    overflow-hidden
    "
    >


      {/* Header */}
      <div
      className="
      px-4 py-3
      border-b
      border-slate-800
      flex
      items-center
      gap-3
      "
      >

        <div className="
        w-3 h-3
        bg-green-500
        rounded-full
        "/>

        <h2 className="
        text-white
        font-semibold
        ">
          Rajesh AI Assistant
        </h2>

      </div>



      {/* Messages */}
      <div
      ref={chatRef}
      className="
      flex-1
      overflow-y-auto
      p-4
      space-y-3
      "
      >

      {
      messages.map((msg,index)=>(

        <div
        key={index}
        className={
          msg.role==="user"
          ?
          "flex justify-end"
          :
          "flex justify-start"
        }
        >

          <div
          className={
            msg.role==="user"
            ?
            `
            bg-blue-600
            text-white
            px-4 py-2
            rounded-2xl
            max-w-[80%]
            text-sm
            `
            :
            `
            bg-slate-800
            text-slate-200
            px-4 py-2
            rounded-2xl
            max-w-[80%]
            text-sm
            `
          }
          >

          {msg.text}

          </div>


        </div>

      ))
      }


      {
      loading && (
        <div className="
        bg-slate-800
        text-slate-400
        px-4 py-2
        rounded-xl
        w-fit
        text-sm
        ">
          Typing...
        </div>
      )
      }


      </div>



      {/* Input */}
      <form
      onSubmit={handleAskGemini}
      className="
      p-3
      border-t
      border-slate-800
      flex
      gap-2
      "
      >

      <input
      value={prompt}
      onChange={(e)=>setPrompt(e.target.value)}
      placeholder="Ask something..."
      className="
      flex-1
      bg-slate-900
      border
      border-slate-700
      rounded-xl
      px-3
      text-sm
      text-white
      outline-none
      "
      />


      <button
      disabled={loading}
      className="
      bg-blue-600
      hover:bg-blue-500
      px-4
      rounded-xl
      text-white
      "
      >
        Send
      </button>


      </form>


    </div>

    )
    }


    </>
  );
}