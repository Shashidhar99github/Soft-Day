
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getMindfulAdvice = async (mood: string, task?: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `The user is feeling ${mood}.${task ? ` They want to do: "${task}".` : ''} Provide a very short, gentle, and poetic piece of encouragement (max 12 words) in a Japanese minimalist philosophy style (Wabi-sabi/Ikigai).`,
      config: {
        temperature: 0.8,
        topK: 40,
        topP: 0.95,
      },
    });
    return response.text?.trim() || "Take it slowly today. 🌿";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The wind carries gentle thoughts your way.";
  }
};
