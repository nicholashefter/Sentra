// Sentra threat analysis service

export async function analyzeThreat(content) {
  const response = await fetch("https://sentra-rc7y.onrender.com/api/analyze", {
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
