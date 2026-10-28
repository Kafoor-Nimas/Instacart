// Shared Types for Chat Request & Response
export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

export interface ChatRequestBody {
  message: string;
  history?: { role: "user" | "model"; parts: { text: string }[] }[];
}

export interface ChatResponseBody {
  success: boolean;
  reply?: string;
  message?: string;
  error?: string;
}
