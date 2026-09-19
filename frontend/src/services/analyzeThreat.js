// Sentra threat analysis service
//
// This module is the single seam between the UI and the detection backend.
// Right now it resolves with mock data on a short delay so the rest of the
// app can be built and tested end to end. When the real API is ready, only
// this function needs to change — every component that calls analyzeThreat()
// already handles the loading/success/error states it produces.
//
// Swapping in the real backend later should look roughly like:
//
//   export async function analyzeThreat(content) {
//     const response = await fetch("/api/analyze", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ content }),
//     });
//
//     if (!response.ok) {
//       throw new Error(`Analysis failed with status ${response.status}`);
//     }
//
//     return response.json();
//   }
//
// The shape returned below is the contract the UI expects from that response.

const MOCK_RESULT = {
  verdict: "PHISHING",
  riskLevel: "HIGH", // "LOW" | "MEDIUM" | "HIGH"
  threatType: "Credential Harvesting",
  confidence: 96,
  explanation:
    "This message contains multiple characteristics commonly associated with phishing attacks, including urgency, a suspicious sender/domain, and a request for credentials.",
  redFlags: [
    "Urgent language",
    "Suspicious sender/domain",
    "Credential request",
    "Suspicious link",
  ],
  recommendedAction:
    "Do not click the link or provide credentials. Report the message to your security team.",
};

const SIMULATED_LATENCY_MS = 1400;

/**
 * Analyze suspicious content (an email, text message, or link) for phishing
 * and social-engineering risk.
 *
 * @param {string} content - The raw content submitted by the user.
 * @returns {Promise<{
 *   verdict: string,
 *   riskLevel: "LOW" | "MEDIUM" | "HIGH",
 *   threatType: string,
 *   confidence: number,
 *   explanation: string,
 *   redFlags: string[],
 *   recommendedAction: string,
 * }>}
 */
export async function analyzeThreat(content) {
  const trimmed = content.trim();

  if (!trimmed) {
    throw new Error("No content was provided to analyze.");
  }

  // --- Mock implementation ---------------------------------------------
  // Simulates network latency and returns a fixed result so the UI can be
  // fully exercised before the real model is wired up.
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_LATENCY_MS));

  return { ...MOCK_RESULT };
}
