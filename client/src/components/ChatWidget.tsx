import React, { useState } from "react";
import { XIcon } from "lucide-react";
import type { ChatMessage, ChatResponseBody } from "../types/chat";
import api from "../config/api";

interface ChatWidgetProps {
  onClose?: () => void;
}

export default function ChatWidget({ onClose }: ChatWidgetProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init-1",
      sender: "bot",
      text: "Hi! 🛒 I'm your Instacart Grocery Assistant. Need help finding items, recipe ingredients, or order updates?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const sendMessage = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: trimmedInput,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await api.post<ChatResponseBody>("/chat/message", {
        message: trimmedInput,
      });

      const data = response.data;

      if (data.success && data.reply) {
        const botMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: data.reply,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        throw new Error(data.message || "Failed to fetch AI response");
      }
    } catch (err: any) {
      const isOverloaded = err.response?.status === 503 || err.response?.data?.error?.includes("503");
  const errorMsg: ChatMessage = {
    id: (Date.now() + 1).toString(),
    sender: "bot",
    text: isOverloaded
      ? "Google AI services are experiencing temporary high traffic. Retrying in a moment..."
      : err.response?.data?.message || "Sorry, I encountered an error connecting to the AI server.",
    timestamp: new Date(),
  };
  setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex h-[500px] w-80 flex-col rounded-2xl border border-zinc-200 bg-white shadow-xl sm:w-96">
      {/* Header */}
      <div className="flex items-center justify-between rounded-t-2xl bg-emerald-600 p-4 text-white">
        <span className="text-sm font-semibold">Instacart Grocery AI 🛒</span>
        {onClose && (
          <button
            onClick={onClose}
            type="button"
            className="rounded-lg p-1 transition hover:bg-emerald-700"
          >
            <XIcon size={18} />
          </button>
        )}
      </div>

      {/* Chat Messages */}
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
                msg.sender === "user"
                  ? "rounded-br-none bg-emerald-600 text-white"
                  : "rounded-bl-none border border-zinc-200 bg-zinc-100 text-zinc-900"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-zinc-100 px-4 py-2 text-xs italic text-zinc-500">
              AI is searching items...
            </div>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form
        onSubmit={sendMessage}
        className="flex gap-2 border-t border-zinc-200 p-3"
      >
        <input
          type="text"
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
          placeholder="Ask about groceries or recipes..."
          className="flex-1 rounded-xl border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-emerald-600"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}
