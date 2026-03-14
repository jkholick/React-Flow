export type NodeField = {
  name: string;
  label: string;
  type: "text" | "textarea" | "select" | "cron";
  options?: string[];
};

export const nodeSchemas: Record<string, NodeField[]> = {
  "Trigger Node": [
    {
      name: "eventType",
      label: "Event Type",
      type: "select",
      options: ["Webhook", "Manual", "Schedule"],
    },
    {
      name: "source",
      label: "Source",
      type: "text",
    },
    {
      name: "schedule",
      label: "Schedule",
      type: "cron",
    },
  ],

  "Action Node": [
    {
      name: "actionType",
      label: "Action Type",
      type: "text",
    },
    {
      name: "target",
      label: "Target",
      type: "text",
    },
  ],

  "Condition Node": [
    {
      name: "condition",
      label: "Condition",
      type: "text",
    },
    {
      name: "value",
      label: "Value",
      type: "text",
    },
  ],
};
