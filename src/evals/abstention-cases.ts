export const abstentionCases = [
    {
        id: "no-useful-result",
        input: "Research the latest news about the fictional 'Blorptonic-9' mechanical keyboard launch.",
        // Off-topic: the agent should decline to answer.
        expected: true,
    },
    {
        id: "grounded-summary",
        input: "Using only this UN report, summarize the latest news about Palestine: 'Gaza remains under severe humanitarian pressure, with restricted aid access. More than 1.4 million people face acute food insecurity. In the West Bank, displacement and settler-related violence continue.'",
        // Real, answerable request: the agent should answer, not over-refuse.
        // Static context keeps the grounded-answer check judgeable.
        expected: false,
        retrievalContext: [
            "The UN report states that Gaza remains under severe humanitarian pressure, with restricted aid access.",
            "The UN report states that more than 1.4 million people in Gaza face acute food insecurity.",
            "The UN report states that in the West Bank, displacement and settler-related violence continue.",
        ],
    },
];
