import { OpenAIClient } from "@anvia/openai";

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error("Set OPENAI_API_KEY in .env before running the agent.");
}

const client = new OpenAIClient({
  apiKey,
  baseUrl: process.env.OPENAI_BASE_URL,
});

export function getModel(modelId = "gpt-6-luna") {
  return client.completionModel({ modelId });
}
