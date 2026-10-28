// src/controllers/chat.controller.ts
import { Request, Response } from "express";
import { GoogleGenAI } from "@google/genai";
import { ChatRequestBody, ChatResponseBody } from "../types/express/chat.js";

const INSTACART_GROCERY_SYSTEM_INSTRUCTION = `
You are an expert AI Shopping Assistant for an Instacart-powered Grocery E-Commerce store.
Your goals:
1. Help users find fresh produce, pantry staples, household items, and brand recommendations.
2. Assist with recipe planning: when users ask for a dish recipe, list out exact grocery ingredients they need to add to their cart.
3. Handle grocery domain inquiries: dietary preferences (vegan, gluten-free, keto, organic), order updates, delivery slots, and store replacements.
4. Maintain a polite, helpful, and concise tone. Keep responses easy to read on mobile devices.
`;

export const handleChat = async (
  req: Request<{}, {}, ChatRequestBody>,
  res: Response<ChatResponseBody>,
): Promise<Response> => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Message string is required.",
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("❌ ERROR: GEMINI_API_KEY is missing from process.env!");
      return res.status(500).json({
        success: false,
        message:
          "Server configuration error: GEMINI_API_KEY is not configured.",
      });
    }

    // Initialize client dynamically when environment variables are ready
    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: message,
      config: {
        systemInstruction: INSTACART_GROCERY_SYSTEM_INSTRUCTION,
      },
    });

    const replyText =
      response.text || "I'm sorry, I couldn't process your grocery inquiry.";

    return res.status(200).json({
      success: true,
      reply: replyText,
    });
  } catch (error: any) {
    console.error("Gemini API Error Detail:", error);
    return res.status(500).json({
      success: false,
      message: "Instacart AI Assistant request failed",
      error: error?.message || "Internal server error",
    });
  }
};
