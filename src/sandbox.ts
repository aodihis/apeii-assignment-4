import { DockerSandboxClient } from "@anvia/sandbox";

const client = new DockerSandboxClient();
await client.pullImage({image: "ghcr.io/astral-sh/uv:alphine"});
// export const sandbox = await client.createSandbox({
    
// });