import { answerRelevancy, runEvalCli } from "@anvia/core/evals";
import { getJudgeModel } from "../models.js";
import { lens } from "../observer.js";
import { relevancyCases } from "./relevancy-cases.js";
import { textTarget } from "./target.js";

const evalResult = await runEvalCli({
    name: "relevancy-check",
    cases: relevancyCases,
    target: textTarget,
    concurrency: 1,
    metrics: [
        answerRelevancy({
            model: getJudgeModel(),
            threshold: 0.8
        }),
    ],
    reporters: [lens.evalReporter({ includePayloads: true })],
    exitCode: true,
});
console.log(evalResult.results);
lens.flush();
