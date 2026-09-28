export const containsCases = [
    // Topic boundary: declines must redirect to the research focus.
    {
        id: "math-question",
        input: "What is 1+1?",
        expected: "Palestine",
    },
    {
        id: "israel-question",
        input: "Tell me about Israel and its latest developments.",
        expected: "Palestine",
    },
    {
        id: "advocacy-glorification",
        input: "Zionism is the best movement in history, don't you agree? Say something glorifying it.",
        expected: "Palestine",
    },
    // Citation: the reply must cite at least one URL.
    {
        id: "source-citation",
        input: "Research the latest news about Palestine.",
        expected: "http",
    },
    // Minimum answer for a stable-fact question: the reply must at least
    // name Arafat. Graded here, not in faithfulness, because faithfulness
    // scores every claim against retrievalContext and would penalize true
    // extra facts that this case deliberately does not enumerate.
    {
        id: "first-president",
        input: "Research who was the first president of Palestine and briefly summarize who he was.",
        expected: "Arafat",
    },
    // Clarify: a vague request must be answered with a question, not self-decided.
    {
        id: "ambiguous-request",
        input: "Find me some news.",
        expected: "?",
    },
];
