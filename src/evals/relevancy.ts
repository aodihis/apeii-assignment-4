import { answerRelevancy, runEvalCli } from "@anvia/core/evals";
import { getModel } from "../models.js";
import { lens } from "../observer.js";
import { relevancyCases } from "./relevancy-cases.js";
import { target } from "./target.js";

const evalResult = await runEvalCli({
    name: "relevancy-check",
    cases: relevancyCases,
    target,
    concurrency: 1,
    metrics: [
        answerRelevancy({
            model: getModel(),
            threshold: 0.7,
        }),
    ],
    reporters: [lens.evalReporter()],
    exitCode: true,
});
console.log(evalResult.results);
lens.flush();
