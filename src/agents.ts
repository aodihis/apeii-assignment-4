import { Agent } from "@anvia/core";
import { getModel } from "./models.js";
import { BASE_INSTRUCTIONS } from "./prompt.js";

export function createAgent(modelId?: string) {
  return new Agent({
    id: "assistant",
    model: getModel(modelId),
    instructions: BASE_INSTRUCTIONS,
  });
}
