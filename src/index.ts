import { createAgent } from "./agents.js";


const agent = createAgent()
const res = await agent.generate({
    prompt: "who can change the billing settings?"
});
console.log(res.text)