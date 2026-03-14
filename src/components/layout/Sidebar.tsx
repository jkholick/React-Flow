import "./Sidebar.css";

export default function Sidebar() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="sidebar">
      <h3>Nodes</h3>

      <div
        className="node-item"
        draggable
        onDragStart={(event) => onDragStart(event, "trigger")}
      >
        Trigger Node
      </div>

      <div
        className="node-item"
        draggable
        onDragStart={(event) => onDragStart(event, "action")}
      >
        Action Node
      </div>

      <div
        className="node-item"
        draggable
        onDragStart={(event) => onDragStart(event, "condition")}
      >
        Condition Node
      </div>
    </div>
  );
}
