# Devscale AI Product Engineering: TypeScript VI

## Week 6 - Assignment 4

Assignment by Iqbal.

This assignment builds a simple news research agent with one focused task: research recent news about Palestine and write a short cited report. It uses TypeScript, Anvia Agent Core, a Docker sandbox, Tavily web search, and an OpenAI-compatible language model API.

The agent runs on `gpt-5.6-luna`, the reasoning-capable model. The LLM judges in the evals run on a different model, `deepseek-v4.1-flash`, so no model ever grades its own output.

## Requirements

- Node.js
- pnpm
- Docker
- An OpenAI-compatible API key and base URL
- A Tavily API key

## Assignment Requirements

This project satisfies the assignment requirements by:

- Creating a simple agent with one focused research task.
- Giving it sandbox tools to create and read a short report file:
  - `write_file`
  - `read_file`
  - `list_files`
  - `exec_command`
- Adding a `web_search` tool and putting a verified source URL in the report.
- Writing the five required eval cases:
  - clear answer (relevancy)
  - ambiguous request (contains)
  - no useful result (abstention)
  - source citation (contains)
  - report file created (custom `report-file-created` metric)

## Setup

Install dependencies:

```bash
pnpm install
```

Create a local environment file from the example:

```bash
cp .env.example .env
```

Update `.env` with your credentials:

```env
OPENAI_API_KEY=your-api-key
OPENAI_BASE_URL=your-openai-compatible-base-url
TAVILY_API_KEY=your-tavily-api-key
AGENT_MODEL_ID=gpt-5.6-luna
JUDGE_MODEL_ID=deepseek-v4.1-flash
```

`AGENT_MODEL_ID` and `JUDGE_MODEL_ID` are optional overrides. The agent refuses to start if both are set to the same model.

## Run the Application

Start the agent:

```bash
pnpm dev
```

The application entry point is `src/index.ts`. It creates the agent, registers the web search tool and the sandbox tools, and starts the research loop.

## Available Tools

### Web Search

`web_search` runs a Tavily search and returns titles, URLs, and short content snippets.

The tool returns a plain "no useful results" message when the search finds nothing, so the agent can abstain honestly.

### Write a Report

`write_file` saves the report to `workspace/report.md` inside the sandbox.

The report stays under 250 words and follows a fixed format: a title, a 2-3 sentence summary, 3-5 bullet points, and a Sources section.

### Read the Report

`read_file` reads the final report back before the agent replies.

The chat reply is based on that file, not on the raw search results.

### Sandbox Commands

`exec_command` runs shell commands inside the sandbox.

The agent uses it to verify every source URL with `wget -q -T 10 --spider` before the URL is allowed into the report. Inaccessible URLs are removed together with any facts that came only from them.

## How the Agent Works

The workflow is defined in `src/prompt.ts`:

1. Search the web for the requested topic with `web_search`.
2. If the search finds nothing useful, or the results are all about something other than the specific event or claim that was requested, reply plainly that no such news exists. The agent does not substitute loosely related news and does not write a report in that case.
3. Write a short report to `workspace/report.md` with `write_file`.
4. Check every source URL with `wget --spider` through `exec_command` and rewrite the report without inaccessible URLs.
5. Read the final report with `read_file` and reply with a 2-3 sentence summary plus at least one verified source URL.

The reply only states what the sources say: no added background, no term definitions, and no causes the sources do not state.

The sandbox is a Docker container created in `src/sandbox.ts`. It uses an ephemeral workspace directory, so every run starts from a clean state.

## Eval Suites

Each suite lives in `src/evals/` and runs the real agent:

| Suite | Cases | Metric |
| --- | --- | --- |
| `abstention` | `no-useful-result`, `grounded-summary` | LLM abstention check |
| `contains` | `math-question`, `israel-question`, `advocacy-glorification`, `source-citation`, `first-president`, `ambiguous-request` | substring check on the reply |
| `faithfulness` | `no-such-event` | LLM faithfulness against a frozen truth set |
| `relevancy` | `clear-answer` | LLM answer relevancy |
| `report` | `report-file-created` | custom metric on the sandbox file state |

The suite boundary cases keep the agent focused: it declines math, Israel-specific, and one-sided requests, and asks a clarifying question for vague ones.

The `first-president` case asks a question whose answer never changes, so its check cannot drift over time. The `no-such-event` case asks about a fictional event to catch fabrication: a faithful agent answers "no such news exists" and nothing more.

## Run the Evals

Run all suites in order:

```bash
pnpm eval
```

Or run one suite:

```bash
pnpm eval:abstention
pnpm eval:contains
pnpm eval:faithfulness
pnpm eval:relevancy
pnpm eval:report
```

The latest full run passes 11 of 11 cases.

## Models

The agent uses `gpt-5.6-luna` because it is the reasoning-capable model for the gateway and carries the multi-turn research loop.

The eval judges use `deepseek-v4.1-flash` because judging scored replies needs less reasoning, and because a judge on a different model avoids self-preference bias.

The model IDs are configured in `src/models.ts` and can be overridden through `.env`.
