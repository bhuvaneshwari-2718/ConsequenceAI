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

  const response = await fetch("/api/consequence", {
    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      scenario: cleanScenario,
      category
    })
  });

  if (!response.ok) {
    const errorData = await response.json();

    console.error("API error:", errorData);

    throw new Error(
      errorData.error || "AI analysis failed."
    );
  }

  const data = await response.json();

  console.log("AI response:", data);

  return processResult(data);
}