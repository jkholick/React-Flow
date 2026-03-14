import { ReactFlowProvider } from "reactflow";

import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import Canvas from "./components/layout/Canvas";
import RightPanel from "./components/layout/RightPanel";

function App() {
  return (
    <ReactFlowProvider>
      <div>
        <Header />

        <div className="workspace">
          <Sidebar />

          <Canvas />

          <RightPanel />
        </div>
      </div>
    </ReactFlowProvider>
  );
}

export default App;
