import type { Node, Edge } from "reactflow";

export async function executeWorkflow(nodes: Node[], edges: Edge[]) {
  const logs: string[] = [];

  function log(message: string) {
    const time = new Date().toLocaleTimeString();
    logs.push(`[${time}] ${message}`);
  }

  // Find trigger
  const trigger = nodes.find((node) => node.data.label === "Trigger Node");

  if (!trigger) {
    log("No trigger node found");
    return logs;
  }

  log("Trigger fired");

  let currentNode = trigger;

  while (true) {
    const edge = edges.find((e) => e.source === currentNode.id);

    if (!edge) break;

    const nextNode = nodes.find((n) => n.id === edge.target);

    if (!nextNode) break;

    if (nextNode.data.label === "Action Node") {
      log("Action executed");
    }

    if (nextNode.data.label === "Condition Node") {
      log("Condition evaluated");
    }

    currentNode = nextNode;

    await new Promise((r) => setTimeout(r, 500));
  }

  log("Workflow finished");

  return logs;
}
