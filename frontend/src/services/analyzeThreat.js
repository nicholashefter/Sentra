// Sentra threat analysis service

export async function analyzeThreat(content) {
  const response = await fetch("http://127.0.0.1:5000/api/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: content,
    }),
  });

  if (!response.ok) {
    throw new Error(`Analysis failed with status ${response.status}`);
  }

  return response.json();
}
