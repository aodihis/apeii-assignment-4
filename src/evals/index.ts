// Runs every eval suite in order. Each suite file executes at import time and
// sets process.exitCode on failure, so one failing suite won't skip the rest.
import "./boundary.js";
import "./citation.js";
import "./honesty.js";
import "./relevancy.js";
import "./report.js";
