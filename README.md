# FlowForge Workflow Builder

FlowForge is a **visual workflow automation builder** built with **React, TypeScript, React Flow, and Zustand**.
It allows users to create and execute workflows using a **drag-and-drop node-based interface**.

---

## Live Demo

🌐 https://react-flow-n5p6.onrender.com

---

## Features

* Drag and drop workflow nodes
* Interactive canvas powered by React Flow
* Connect nodes to build workflows
* Dynamic configuration panel for nodes
* Workflow validation (missing trigger, disconnected nodes, cycles)
* Simple workflow execution engine
* Execution logs panel
* Undo / Redo state history

---

## Tech Stack

* React
* TypeScript
* Vite
* React Flow
* Zustand

---

## Project Structure

```
src
├── components
│   └── layout
│       ├── Header.tsx
│       ├── Sidebar.tsx
│       ├── Canvas.tsx
│       ├── RightPanel.tsx
│       ├── ConfigPanel.tsx
│       └── LogsPanel.tsx
│
├── config
│   └── nodeSchemas.ts
│
├── engine
│   ├── executeWorkflow.ts
│   └── validateWorkflow.ts
│
└── store
    └── workflowStore.ts
```

---

## Run Locally

Install dependencies:

```
npm install
```

Start development server:

```
npm run dev
```

Build project:

```
npm run build
```

---

## Future Improvements

* Custom node UI components
* Workflow import / export
* Persistent storage
* More node types and integrations

