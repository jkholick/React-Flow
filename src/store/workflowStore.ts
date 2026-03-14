import { create } from "zustand";
import { Node, Edge } from "reactflow";

interface WorkflowState {
  nodes: Node[];
  edges: Edge[];

  past: { nodes: Node[]; edges: Edge[] }[];
  future: { nodes: Node[]; edges: Edge[] }[];

  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;

  addNode: (type: string) => void;

  selectedNode: Node | null;
  setSelectedNode: (node: Node | null) => void;

  executionLogs: string[];
  setExecutionLogs: (logs: string[]) => void;

  undo: () => void;
  redo: () => void;
}

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: [],

  edges: [],

  past: [],
  future: [],

  setNodes: (nodes) => {
    const { nodes: currentNodes, edges, past } = get();

    set({
      nodes,
      past: [...past, { nodes: currentNodes, edges }],
      future: [],
    });
  },

  setEdges: (edges) => {
    const { nodes, edges: currentEdges, past } = get();

    set({
      edges,
      past: [...past, { nodes, edges: currentEdges }],
      future: [],
    });
  },

  addNode: (type) => {
    const { nodes } = get();

    const newNode = {
      id: crypto.randomUUID(),
      type: "default",
      position: {
        x: Math.random() * 400,
        y: Math.random() * 400,
      },
      data: {
        label: type,
        config: {}, // configuration stored here
      },
    };

    set({
      nodes: [...nodes, newNode],
    });
  },

  selectedNode: null,

  setSelectedNode: (node) => {
    set({ selectedNode: node });
  },

  executionLogs: [],

  setExecutionLogs: (logs) => {
    set({ executionLogs: logs });
  },

  undo: () => {
    const { past, nodes, edges, future } = get();

    if (past.length === 0) return;

    const previous = past[past.length - 1];

    set({
      nodes: previous.nodes,
      edges: previous.edges,
      past: past.slice(0, past.length - 1),
      future: [...future, { nodes, edges }],
    });
  },

  redo: () => {
    const { future, nodes, edges, past } = get();

    if (future.length === 0) return;

    const next = future[future.length - 1];

    set({
      nodes: next.nodes,
      edges: next.edges,
      future: future.slice(0, future.length - 1),
      past: [...past, { nodes, edges }],
    });
  },
}));
