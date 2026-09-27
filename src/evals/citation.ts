import { contains, runEvalCli } from "@anvia/core/evals";
import type { EvalMetricArgs } from "@anvia/core/evals";
import { lens } from "../observer.js";
import { citationCases } from "./citation-cases.js";
import type { ResearchRunOutput } from "./target.js";
import { target } from "./target.js";

const evalResult = await runEvalCli({
    name: "citation-check",
    cases: citationCases,
    target,
    concurrency: 1,
    metrics: [
        contains({
            name: "source-url-cited",
            actual: (args: EvalMetricArgs<string, ResearchRunOutput>) =>
                `${args.output.output}\n${args.output.reportFile.content}`,
            expected: "http",
        }),
    ],
    reporters: [lens.evalReporter()],
    exitCode: true,
});
console.log(evalResult.results);
lens.flush();
