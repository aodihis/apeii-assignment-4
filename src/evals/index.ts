// Runs every eval suite in order. Each suite file executes at import time and
// sets process.exitCode on failure, so one failing suite won't skip the rest.
// One suite per metric; each suite file runs at import time in order.
import "./abstention.js";
import "./contains.js";
import "./faithfulness.js";
import "./relevancy.js";
import "./report.js";
