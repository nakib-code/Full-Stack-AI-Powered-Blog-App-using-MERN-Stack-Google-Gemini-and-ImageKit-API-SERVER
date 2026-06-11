import { GoogleGenerativeAI } from "@google/generative-ai";
import config from "../config";

const apiKey = config.apiKey;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing in .env");
}

const genAI = new GoogleGenerativeAI(apiKey);

async function main(prompt: string) {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const result = await model.generateContent(prompt);
  const response = await result.response;

  return response.text();
}

export default main;