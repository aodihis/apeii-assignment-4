import type { EvalTarget } from "@anvia/core/evals";
import { sandbox } from "../sandbox.js";
import { createAgent } from "../agents.js";

/** Where the agent is asked to save its report. */
export const REPORT_PATH = "workspace/report.md";

/** What every eval target hands to its metrics. */
export type ResearchRunOutput = {
  /** The agent's chat reply. */
  output: string;
  /** State of the report file after the run. */
  reportFile: { created: boolean; content: string };
};

/** Runs the real agent once: clears any previous report, runs the full tool
 *  loop, then snapshots the reply and the report file state. */
export const target: EvalTarget<string, ResearchRunOutput> = async (input) => {
  await sandbox.runtime.exec({ command: "rm", args: ["-f", REPORT_PATH] });

  const agent = createAgent();
  const outcome = await agent.generate({ prompt: input });

  let reportFile: ResearchRunOutput["reportFile"];
  try {
    reportFile = { created: true, content: await sandbox.runtime.readTextFile({ path: REPORT_PATH }) };
  } catch {
    reportFile = { created: false, content: "" };
  }

  return { output: outcome.text, reportFile };
};
