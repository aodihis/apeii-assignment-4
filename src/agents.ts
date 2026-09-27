import { Agent } from "@anvia/core";
import { getModel } from "./models.js";
import { NEWS_RESEARCHER_INSTRUCTIONS } from "./prompt.js";
import { webSearchTool } from "./tools/web-search.js";
import { tools } from "./sandbox.js";
import { lens } from "./observer.js";

export function createAgent(modelId?: string) {
  return new Agent({
    id: "palestine-news-researcher",
    name: "Palestine News Researcher",
    description: "Researches recent news about Palestine with web search and writes a short cited report.",
    model: getModel(modelId),
    instructions: NEWS_RESEARCHER_INSTRUCTIONS,
    tools: [webSearchTool, ...tools],
    maxTurns: 75,
    observability: {
      observers: {
        tracing: lens.observer({
          captureMode: "full",
        }),
      },
    },
    // The OpenAI-compatible gateway occasionally returns transient 502/503s
    // (Cloudflare advises backing off ~60s), so retry with long backoff.
    retries: { maxAttempts: 5, initialDelayMs: 5_000, maxDelayMs: 60_000 },
  });
}
