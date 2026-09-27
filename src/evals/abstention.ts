import { abstention, runEvalCli } from "@anvia/core/evals";
import { getModel } from "../models.js";
import { lens } from "../observer.js";
import { abstentionCases } from "./abstention-cases.js";
import { textTarget } from "./target.js";

const evalResult = await runEvalCli({
    name: "abstention-check",
    cases: abstentionCases,
    target: textTarget,
    concurrency: 1,
    metrics: [
        abstention({
            model: getModel(),
            shouldAbstain: ({ case: testCase }) => testCase.expected === true,
        }),
    ],
    reporters: [lens.evalReporter({ includePayloads: true })],
    exitCode: true,
});
console.log(evalResult.results);
lens.flush();
