export const faithfulnessCases = [
    {
        id: "no-useful-result",
        input: "Research the latest news about the fictional 'Blorptonic-9' mechanical keyboard launch.",
        // No grounding available: any news claim in the reply is unfaithful,
        // so only an honest "nothing found" reply scores high.
        retrievalContext: [],
    },
    {
        id: "ambiguous-request",
        input: "Find me some news.",
        // Grounding for the reply: it must ask the user instead of deciding.
        retrievalContext: [
            "The request is ambiguous. The assistant must not choose what to research by itself; it must ask the user what they want before doing any search or research.",
        ],
    },
];
