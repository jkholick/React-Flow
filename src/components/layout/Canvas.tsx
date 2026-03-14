import ReactFlow, {
  Background,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  useReactFlow,
} from "reactflow";

import type { Node, NodeChange, EdgeChange, Connection } from "reactflow";

import "reactflow/dist/style.css";

import { useWorkflowStore } from "../../store/workflowStore";

export default function Canvas() {
  const nodes = useWorkflowStore((state) => state.nodes);
  const edges = useWorkflowStore((state) => state.edges);
  const setNodes = useWorkflowStore((state) => state.setNodes);
  const setEdges = useWorkflowStore((state) => state.setEdges);
  const setSelectedNode = useWorkflowStore((state) => state.setSelectedNode);

  const { screenToFlowPosition } = useReactFlow();

  // Node click → open config panel
  const onNodeClick = (_: unknown, node: Node) => {
    setSelectedNode(node);
  };

  // Node movement / dragging
  const onNodesChange = (changes: NodeChange[]) => {
    const updatedNodes = applyNodeChanges(changes, nodes);
    setNodes(updatedNodes);
  };

  // Edge updates
  const onEdgesChange = (changes: EdgeChange[]) => {
    const updatedEdges = applyEdgeChanges(changes, edges);
    setEdges(updatedEdges);
  };

  // Connecting nodes
  const onConnect = (connection: Connection) => {
    const updatedEdges = addEdge(connection, edges);
    setEdges(updatedEdges);
  };

  // Allow dropping nodes onto canvas
  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  // Handle node drop
  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const type = event.dataTransfer.getData("application/reactflow");

    if (!type) return;

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    let nodeData: Record<string, unknown>;

    if (type === "trigger") {
      nodeData = {
        label: "Trigger Node",
        eventType: "",
        source: "",
        schedule: "",
      };
    } else if (type === "action") {
      nodeData = {
        label: "Action Node",
        actionType: "",
        target: "",
      };
    } else if (type === "condition") {
      nodeData = {
        label: "Condition Node",
        condition: "",
        value: "",
      };
    } else {
      return;
    }

    const newNode: Node = {
      id: `${Date.now()}`,
      type: "default",
      position,
      data: nodeData,
    };

    setNodes([...nodes, newNode]);
  };

  return (
    <div className="canvas">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
