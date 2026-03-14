import { useWorkflowStore } from "../../store/workflowStore";
import { executeWorkflow } from "../../engine/executeWorkflow";
import { validateWorkflow } from "../../engine/validateWorkflow";

export default function Header() {
  const nodes = useWorkflowStore((state) => state.nodes);
  const edges = useWorkflowStore((state) => state.edges);
  const setExecutionLogs = useWorkflowStore((state) => state.setExecutionLogs);

  const runWorkflow = async () => {
    const errors = validateWorkflow(nodes, edges);

    if (errors.length > 0) {
      setExecutionLogs(errors.map((e) => `❌ ${e}`));
      return;
    }

    const logs = await executeWorkflow(nodes, edges);

    setExecutionLogs(logs);
  };

  return (
    <div className="header">
      <div className="title">FlowForge Workflow Builder</div>

      <div className="controls">
        <button>Save</button>

        <button onClick={runWorkflow}>Run</button>

        <button>Export</button>
      </div>
    </div>
  );
}
