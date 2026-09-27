import { faithfulness, runEvalCli } from "@anvia/core/evals";
import { getModel } from "../models.js";
import { lens } from "../observer.js";
import { faithfulnessCases } from "./faithfulness-cases.js";
import { textTarget } from "./target.js";

const evalResult = await runEvalCli({
    name: "faithfulness-check",
    cases: faithfulnessCases,
    target: textTarget,
    concurrency: 1,
    metrics: [
        faithfulness({
            model: getModel(),
            threshold: 0.8,
        }),
    ],
    reporters: [lens.evalReporter({ includePayloads: true })],
    exitCode: true,
});
console.log(evalResult.results);
lens.flush();
