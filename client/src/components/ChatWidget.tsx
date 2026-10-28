import { useState } from "react";
import type { ChatMessage, ChatResponseBody } from "../types/chat";

export default function ChatWidget() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init-1",
      sender: "bot",
      text: "Hi! How can I help you with your internship or portfolio today?",
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
      const response = await fetch("http://localhost:5000/api/chat/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify({ message: trimmedInput }),
      });

      const data: ChatResponseBody = await response.json();

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
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: "Sorry, I encountered an error connecting to the AI server.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 flex h-[500px] w-80 sm:w-96 flex-col rounded-2xl border border-zinc-200 bg-white shadow-xl z-50">
      {/* Header */}
      <div className="flex items-center justify-between rounded-t-2xl bg-blue-600 p-4 text-white">
        <span className="font-semibold text-sm">AI Assistant 🤖</span>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-zinc-100 text-zinc-900 rounded-bl-none border border-zinc-200"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-zinc-100 px-4 py-2 text-xs text-zinc-500 italic">
              AI is thinking...
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
          placeholder="Ask a question..."
          className="flex-1 rounded-xl border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}
