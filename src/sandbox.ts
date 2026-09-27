import { createDockerSandboxTools, DockerSandboxClient } from "@anvia/sandbox";

const client = new DockerSandboxClient();
await client.pullImage({ image: "ghcr.io/astral-sh/uv:alpine" });

export const sandbox = await client.createSandbox({
  image: "ghcr.io/astral-sh/uv:alpine",
  workspace: { type: "ephemeral" },
  network: { mode: "bridge" },
  directories: ["workspace"],
  resources: { memoryMb: 256, cpus: 1, pidsLimit: 64 },
});

export const tools = createDockerSandboxTools({
  sandbox: sandbox.runtime,
  tools: [
    "read_file",
    "write_file",
    "list_files",
    "exec_command",
  ],
});