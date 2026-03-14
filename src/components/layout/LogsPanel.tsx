import "./LogsPanel.css";

import { useWorkflowStore } from "../../store/workflowStore";

export default function LogsPanel() {
  const executionLogs = useWorkflowStore((state) => state.executionLogs);

  return (
    <div className="logs-panel">
      <h3>Workflow Logs</h3>

      {executionLogs.length === 0 ? (
        <p>No logs yet. Run the workflow.</p>
      ) : (
        <div className="log-output">
          {executionLogs.map((log, index) => (
            <div key={index}>{log}</div>
          ))}
        </div>
      )}
    </div>
  );
}
