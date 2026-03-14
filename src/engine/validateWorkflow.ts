import type { Node, Edge } from "reactflow";

export function validateWorkflow(nodes: Node[], edges: Edge[]) {
  const errors: string[] = [];

  if (nodes.length === 0) {
    errors.push("Workflow is empty");
    return errors;
  }

  // Rule 1: Must contain at least one Trigger
  const triggerNodes = nodes.filter(
    (node) => node.data.label === "Trigger Node",
  );

  if (triggerNodes.length === 0) {
    errors.push("Workflow must contain at least one Trigger Node");
  }

  // Rule 2: Check disconnected nodes
  nodes.forEach((node) => {
    const connected = edges.some(
      (edge) => edge.source === node.id || edge.target === node.id,
    );

    if (!connected && nodes.length > 1) {
      errors.push(`Node "${node.data.label}" is not connected`);
    }
  });

  // Rule 3: Detect circular dependencies
  const visited = new Set<string>();
  const stack = new Set<string>();

  function dfs(nodeId: string): boolean {
    if (stack.has(nodeId)) return true;
    if (visited.has(nodeId)) return false;

    visited.add(nodeId);
    stack.add(nodeId);

    const outgoingEdges = edges.filter((edge) => edge.source === nodeId);

    for (const edge of outgoingEdges) {
      if (dfs(edge.target)) return true;
    }

    stack.delete(nodeId);
    return false;
  }

  for (const node of nodes) {
    if (dfs(node.id)) {
      errors.push("Workflow contains a cycle");
      break;
    }
  }

  // Rule 4: Missing configuration
  nodes.forEach((node) => {
    const config = node.data.config || {};

    Object.entries(config).forEach(([key, value]) => {
      if (!value) {
        errors.push(`Node "${node.data.label}" missing value for "${key}"`);
      }
    });
  });

  return errors;
}
