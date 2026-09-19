import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Analyzer from "./components/Analyzer";
import ResultsPanel from "./components/ResultsPanel";
import { analyzeThreat } from "./services/analyzeThreat";
import "./App.css";

// status: "idle" | "loading" | "success" | "error"
export default function App() {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleAnalyze() {
    setStatus("loading");
    setErrorMessage("");

    try {
      const analysis = await analyzeThreat(input);
      setResult(analysis);
      setStatus("success");
    } catch (error) {
      setErrorMessage(
        error?.message || "Something went wrong while analyzing this content."
      );
      setStatus("error");
    }
  }

  return (
    <div className="app">
      <Header />

      <main className="app__main">
        <Hero />

        <div className="app__workspace">
          <Analyzer
            value={input}
            onChange={setInput}
            onSubmit={handleAnalyze}
            isLoading={status === "loading"}
          />

          <ResultsPanel
            status={status}
            result={result}
            errorMessage={errorMessage}
            onRetry={handleAnalyze}
          />
        </div>
      </main>
    </div>
  );
}
