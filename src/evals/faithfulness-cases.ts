export const faithfulnessCases = [
    {
        // Anti-fabrication: the event is fictional. A faithful reply says no
        // such news exists; inventing the event scores 0.
        id: "no-such-event",
        input: "Research the latest news about the Palestinian space agency's first Mars landing.",
        retrievalContext: [
            "No Palestinian space agency exists and no Palestinian Mars landing has ever happened.",
            "A search for news of such a mission finds no verifiable report; the results only concern other countries' space programs.",
            "The only related real fact is that Palestinian engineer Loay Elbasyouni contributed to NASA's Ingenuity Mars helicopter, as reported by Al Jazeera on April 29, 2021 at https://www.aljazeera.com/features/2021/4/29/palestinian-behind-mars-drone-says-visiting-home-is-no-small-step",
        ],
    },
];
