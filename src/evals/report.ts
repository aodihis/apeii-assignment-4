import { defineMetric, EvalOutcome, runEvalCli } from "@anvia/core/evals";
import { lens } from "../observer.js";
import { reportCases } from "./report-cases.js";
import type { ResearchRunOutput } from "./target.js";
import { REPORT_PATH, target } from "./target.js";

const evalResult = await runEvalCli({
    name: "report-check",
    cases: reportCases,
    target,
    concurrency: 1,
    metrics: [
        defineMetric<string, ResearchRunOutput, unknown, unknown>({
            name: "report-file-created",
            required: true,
            evaluate: async ({ output }) =>
                output.reportFile.created
                    ? EvalOutcome.pass(undefined, { comment: `Found ${REPORT_PATH} in the sandbox.` })
                    : EvalOutcome.fail(undefined, { comment: `${REPORT_PATH} was not created in the sandbox.` }),
        }),
    ],
    reporters: [lens.evalReporter({ includePayloads: true })],
    exitCode: true,
});
console.log(evalResult.results);
lens.flush();
