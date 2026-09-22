function validateConsequences(data) {
  if (!Array.isArray(data)) {
    return false;
  }

  return data.every((item) => {
    return (
      item.id &&
      item.level &&
      item.type &&
      item.title &&
      item.description &&
      item.impact &&
      item.likelihood &&
      item.explanation
    );
  });
}

function processResult(data) {
  if (!Array.isArray(data)) {
    throw new Error("AI response must be an array.");
  }

  const processedData = data.map((item, index) => {
    return {
      id: item.id || index + 1,
      level: item.level || "Unknown Effect",
      type: item.type || "unknown",
      title: item.title || "Untitled consequence",
      description: item.description || "No description available.",
      impact: item.impact || "Unknown",
      likelihood: item.likelihood || "Unknown",
      explanation:
        item.explanation || "No explanation available."
    };
  });

  if (!validateConsequences(processedData)) {
    throw new Error("Invalid consequence data.");
  }

  return processedData;
}

export async function analyzeScenario(scenario, category) {
  const cleanScenario = scenario.trim();

  if (!cleanScenario) {
    throw new Error("Scenario cannot be empty.");
  }

  const response = await fetch(
    "https://api.openai.com/v1/responses",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          import.meta.env.VITE_OPENAI_API_KEY
        }`
      },

      body: JSON.stringify({
        model: "gpt-4.1-mini",

        input: `
You are the AI engine for an application called CONSEQUENCE.

The user gives you a scenario and you analyze the chain of consequences.

Category:
${category}

Scenario:
${cleanScenario}

Generate exactly 4 consequences:

1. Direct Effect
2. Second-Order Effect
3. Second-Order Effect
4. System Effect

Return ONLY a valid JSON array.

Each object must contain exactly these fields:

id
level
type
title
description
impact
likelihood
explanation

Use these type values:

direct
second-order
system

Example format:

[
  {
    "id": 1,
    "level": "Direct Effect",
    "type": "direct",
    "title": "Example title",
    "description": "Example description",
    "impact": "High",
    "likelihood": "High",
    "explanation": "Example explanation"
  }
]

Do not use markdown.
Do not write anything before or after the JSON.
`
      })
    }
  );

  if (!response.ok) {
    const errorData = await response.json();

    console.error("OpenAI error:", errorData);

    throw new Error("OpenAI API request failed.");
  }

  const data = await response.json();

  console.log("OpenAI response:", data);

  const outputText =
    data.output
      ?.flatMap((item) => item.content || [])
      ?.find(
        (content) => content.type === "output_text"
      )
      ?.text;

  if (!outputText) {
    throw new Error("No AI response received.");
  }

  const parsedResult = JSON.parse(outputText);

  return processResult(parsedResult);
}