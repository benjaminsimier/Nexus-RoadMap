import { GoogleGenAI, Type } from "@google/genai";
import { Category, Status } from '../types';

export const generateRoadmapSuggestions = async (productDescription: string): Promise<any[]> => {
  if (!process.env.API_KEY) {
    console.error("API Key is missing");
    throw new Error("API Key is missing. Please set REACT_APP_GEMINI_API_KEY.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    Based on the following product description, generate 3 roadmap feature ideas.
    The product is: "${productDescription}".
    
    Return a list of items. Each item should include:
    - title
    - short description (max 2 sentences)
    - suggested category (must be one of: 'Core Platform', 'Integrations', 'UI/UX', 'Security', 'Analytics')
    - suggested status (must be one of: 'PLANNED', 'BACKLOG')
    - suggested progress (integer 0-100, usually 0 for planned/backlog items)
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              category: { type: Type.STRING },
              status: { type: Type.STRING },
              progress: { type: Type.INTEGER }
            },
            required: ["title", "description", "category", "status", "progress"]
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    return [];
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};