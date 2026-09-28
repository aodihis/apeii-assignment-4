import { OpenAIClient } from "@anvia/openai";

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error("Set OPENAI_API_KEY in .env before running the agent.");
}

const client = new OpenAIClient({
  apiKey,
  baseUrl: process.env.OPENAI_BASE_URL,
});

// Agent and judge must run different models so evals never self-judge the
// agent's own model (self-preference bias). The agent gets gpt-5.6-luna: it
// is the reasoning-capable one (native reasoning-effort controls in
// @anvia/openai for the gpt-5.6 family) and is already proven against this
// gateway. The judge scores outputs, which needs less reasoning, so it gets
// deepseek-v4.1-flash. Override either via env, but never to the same value.
export const AGENT_MODEL_ID = process.env.AGENT_MODEL_ID ?? "gpt-5.6-luna";
export const JUDGE_MODEL_ID = process.env.JUDGE_MODEL_ID ?? "deepseek-v4.1-flash";

if (AGENT_MODEL_ID === JUDGE_MODEL_ID) {
  throw new Error(
    `Judge model must differ from the agent model (both are "${AGENT_MODEL_ID}"). Set AGENT_MODEL_ID or JUDGE_MODEL_ID.`,
  );
}

export function getModel(modelId = AGENT_MODEL_ID) {
  return client.completionModel({ modelId });
}

export function getJudgeModel() {
  return getModel(JUDGE_MODEL_ID);
}
