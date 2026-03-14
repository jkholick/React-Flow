import { useState } from "react";
import ConfigPanel from "./ConfigPanel";
import LogsPanel from "./LogsPanel";
import "./RightPanel.css";

export default function RightPanel() {
  const [activeTab, setActiveTab] = useState("config");
  const [width, setWidth] = useState(300);

  const startResize = (e: React.MouseEvent) => {
    const startX = e.clientX;
    const startWidth = width;

    const onMouseMove = (e: MouseEvent) => {
      const newWidth = startWidth - (e.clientX - startX);

      if (newWidth > 200 && newWidth < 600) {
        setWidth(newWidth);
      }
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div className="right-panel" style={{ width: `${width}px` }}>
      <div className="resize-handle" onMouseDown={startResize} />

      <div className="panel-tabs">
        <button
          className={activeTab === "config" ? "active" : ""}
          onClick={() => setActiveTab("config")}
        >
          Config
        </button>

        <button
          className={activeTab === "logs" ? "active" : ""}
          onClick={() => setActiveTab("logs")}
        >
          Logs
        </button>
      </div>

      <div className="panel-content">
        {activeTab === "config" && <ConfigPanel />}
        {activeTab === "logs" && <LogsPanel />}
      </div>
    </div>
  );
}
