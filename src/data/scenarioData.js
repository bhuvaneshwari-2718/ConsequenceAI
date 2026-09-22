const scenarioData = [
  {
    id: 1,
    level: "Direct Effect",
    type: "direct",
    title: "Reduced support costs",
    description:
      "The company may reduce operational costs by automating repetitive support tasks.",
    impact: "High",
    likelihood: "High",
    explanation:
      "Automating repetitive questions can reduce the amount of manual support work required."
  },

  {
    id: 2,
    level: "Second-Order Effect",
    type: "second-order",
    title: "Faster response times",
    description:
      "AI can handle multiple customer requests simultaneously, potentially reducing waiting times.",
    impact: "High",
    likelihood: "High",
    explanation:
      "Unlike a human support team, an AI system can respond to many requests at the same time."
  },

  {
    id: 3,
    level: "Second-Order Effect",
    type: "second-order",
    title: "Job role changes",
    description:
      "Some support roles may shift toward handling complex cases and supervising AI systems.",
    impact: "Medium",
    likelihood: "High",
    explanation:
      "Employees may spend less time answering repetitive questions and more time handling exceptions."
  },

  {
    id: 4,
    level: "System Effect",
    type: "system",
    title: "Customer trust becomes important",
    description:
      "Customers may respond differently depending on the quality and transparency of AI-generated support.",
    impact: "High",
    likelihood: "Medium",
    explanation:
      "Poor AI responses can reduce trust, while transparent and accurate systems may improve the customer experience."
  }
];

export default scenarioData;