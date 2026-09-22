export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed."
    });
  }

  try {
    const { scenario, category } = req.body;

    const cleanScenario = scenario?.trim();

    if (!cleanScenario) {
      return res.status(400).json({
        error: "Scenario cannot be empty."
      });
    }

    const response = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
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

      return res.status(response.status).json({
        error: "OpenAI API request failed."
      });
    }

    const data = await response.json();

    const outputText =
      data.output
        ?.flatMap((item) => item.content || [])
        ?.find(
          (content) => content.type === "output_text"
        )
        ?.text;

    if (!outputText) {
      return res.status(500).json({
        error: "No AI response received."
      });
    }

    const parsedResult = JSON.parse(outputText);

    return res.status(200).json(parsedResult);

  } catch (error) {
    console.error("Server error:", error);

    return res.status(500).json({
      error: "Something went wrong while analyzing the scenario."
    });
  }
}