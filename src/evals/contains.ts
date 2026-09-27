import { contains, runEvalCli } from "@anvia/core/evals";
import type { EvalMetricArgs } from "@anvia/core/evals";
import { lens } from "../observer.js";
import { containsCases } from "./contains-cases.js";
import { textTarget } from "./target.js";

const evalResult = await runEvalCli({
    name: "contains-check",
    cases: containsCases,
    target: textTarget,
    concurrency: 1,
    metrics: [
        contains({
            name: "reply-contains-expected",
            actual: (args: EvalMetricArgs<string, string, string>) => args.output,
            expected: (args) => args.case.expected!,
        }),
    ],
    reporters: [lens.evalReporter({ includePayloads: true })],
    exitCode: true,
});
console.log(evalResult.results);
lens.flush();
