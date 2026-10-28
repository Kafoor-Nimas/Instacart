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
  res: Response<ChatResponseBody>
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
        message: "Server configuration error: GEMINI_API_KEY is missing.",
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    // Active Gemini models
    const modelsToTry = [
      "gemini-3.5-flash-lite",
      "gemini-3.5-flash",
      "gemini-3.8-flash",
    ];

    let responseText = "";
    let lastError: any = null;

    for (const modelName of modelsToTry) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: message,
          config: {
            systemInstruction: INSTACART_GROCERY_SYSTEM_INSTRUCTION,
          },
        });

        if (response.text) {
          responseText = response.text;
          break; // Success! Exit loop
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`⚠️ Model ${modelName} failed (${err.status || err.message}). Trying fallback...`);
      }
    }

    if (!responseText) {
      throw lastError || new Error("All model endpoints failed to return a response.");
    }

    return res.status(200).json({
      success: true,
      reply: responseText,
    });
  } catch (error: any) {
    console.error("Gemini API Final Failure:", error);
    return res.status(500).json({
      success: false,
      message: "Instacart AI Assistant request failed",
      error: error?.message || "Internal server error",
    });
  }
};