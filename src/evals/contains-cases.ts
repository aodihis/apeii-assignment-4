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
    // Clarify: a vague request must be answered with a question, not self-decided.
    {
        id: "ambiguous-request",
        input: "Find me some news.",
        expected: "?",
    },
];
