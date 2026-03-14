export const nodeSchemas = {
  "Trigger Node": [
    {
      name: "eventType",
      label: "Event Type",
      type: "select",
      options: ["Form Submit", "Webhook", "Schedule"],
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
      name: "apiEndpoint",
      label: "API Endpoint",
      type: "text",
    },
    {
      name: "method",
      label: "HTTP Method",
      type: "select",
      options: ["GET", "POST", "PUT", "DELETE"],
    },
    {
      name: "payload",
      label: "Payload",
      type: "textarea",
    },
  ],

  "Condition Node": [
    {
      name: "variable",
      label: "Variable",
      type: "text",
    },
    {
      name: "operator",
      label: "Operator",
      type: "select",
      options: ["==", "!=", ">", "<"],
    },
    {
      name: "value",
      label: "Value",
      type: "text",
    },
  ],
};
