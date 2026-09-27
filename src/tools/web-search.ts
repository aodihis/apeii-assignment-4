import { createTool } from "@anvia/core/tool";
import { z } from "zod";

const apiKey = process.env.TAVILY_API_KEY;

if (!apiKey) {
  throw new Error("Set TAVILY_API_KEY in .env before running the agent.");
}

type TavilyResult = {
  title?: string | undefined;
  url: string;
  content?: string | undefined;
  published_date?: string | undefined;
};

type TavilyResponse = {
  answer?: string | undefined;
  results?: TavilyResult[] | undefined;
};

const SearchInput = z.object({
  query: z.string().min(1).describe("What to search for, e.g. 'latest AI industry news'"),
  topic: z
    .enum(["news", "general"])
    .default("news")
    .describe("Use 'news' for recent events, 'general' for evergreen or non-news topics"),
  maxResults: z.number().int().min(1).max(10).default(5).describe("Number of results to return"),
});

export const webSearchTool = createTool({
  name: "web_search",
  description: "Use this tool to run a web search.",
  inputSchema: SearchInput,
  execute: async ({ query, topic, maxResults }) => {
    const response = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        topic,
        max_results: maxResults,
        days: topic === "news" ? 7 : undefined,
        include_answer: true,
        search_depth: "basic",
      }),
      signal: AbortSignal.timeout(15_000),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      return `Web search failed with status ${response.status}. ${detail.slice(0, 200)}`;
    }

    const data = (await response.json()) as TavilyResponse;
    const results = data.results ?? [];

    if (results.length === 0) {
      return "No useful results found for this query.";
    }

    const lines = results.map((result, index) => {
      const published = result.published_date ? ` (published ${result.published_date})` : "";
      return `${index + 1}. ${result.title ?? result.url}${published}\n   URL: ${result.url}\n   ${result.content?.slice(0, 300) ?? ""}`;
    });

    if (data.answer) {
      lines.unshift(`Summary: ${data.answer}`);
    }

    return lines.join("\n\n");
  },
});
