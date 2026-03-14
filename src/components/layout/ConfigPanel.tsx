import { useWorkflowStore } from "../../store/workflowStore";
import { nodeSchemas, type NodeField } from "../../config/nodeSchemas";

export default function ConfigPanel() {
  const selectedNode = useWorkflowStore((state) => state.selectedNode);
  const nodes = useWorkflowStore((state) => state.nodes);
  const setNodes = useWorkflowStore((state) => state.setNodes);

  if (!selectedNode) {
    return (
      <div className="config-panel">
        <h3>Node Configuration</h3>
        <p>Select a node to edit its settings.</p>
      </div>
    );
  }

  const schema =
    nodeSchemas[selectedNode?.data?.label as keyof typeof nodeSchemas];

  const handleChange = (fieldName: string, value: string) => {
    const updatedNodes = nodes.map((node) => {
      if (node.id !== selectedNode.id) return node;

      return {
        ...node,
        data: {
          ...node.data,
          config: {
            ...node.data.config,
            [fieldName]: value,
          },
        },
      };
    });

    setNodes(updatedNodes);
  };

  return (
    <div className="config-panel">
      <h3>{selectedNode.data.label}</h3>

      {schema?.map((field: NodeField) => {
        const value = selectedNode.data.config?.[field.name] || "";

        return (
          <div key={field.name} className="config-item">
            <label>{field.label}</label>

            {field.type === "text" && (
              <input
                type="text"
                value={value}
                onChange={(e) => handleChange(field.name, e.target.value)}
              />
            )}

            {field.type === "textarea" && (
              <textarea
                value={value}
                onChange={(e) => handleChange(field.name, e.target.value)}
              />
            )}

            {field.type === "select" && (
              <select
                value={value}
                onChange={(e) => handleChange(field.name, e.target.value)}
              >
                <option value="">Select</option>

                {field.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}

            {field.type === "cron" && (
              <input
                placeholder="* * * * *"
                value={value}
                onChange={(e) => handleChange(field.name, e.target.value)}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
