import ReactFlow, { useReactFlow } from "reactflow";
import { useWorkflowStore } from "../../store/workflowStore";

export default function WorkflowCanvas() {
  const { project } = useReactFlow(); // 👈 STEP 4 GOES HERE

  const nodes = useWorkflowStore((state) => state.nodes);
  const edges = useWorkflowStore((state) => state.edges);
  const setNodes = useWorkflowStore((state) => state.setNodes);

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();

    const type = event.dataTransfer.getData("application/reactflow");

    if (!type) return;

    const position = project({
      x: event.clientX,
      y: event.clientY,
    });

    const newNode = {
      id: `${Date.now()}`,
      type: "default",
      position,
      data: { label: `${type} node` },
    };

    setNodes([...nodes, newNode]);
  };

  return (
    <div className="canvas">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
      />
    </div>
  );
}
