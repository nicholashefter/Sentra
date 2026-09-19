const RISK_STYLES = {
  HIGH: "results__risk-badge--high",
  MEDIUM: "results__risk-badge--medium",
  LOW: "results__risk-badge--low",
};

function IdleState() {
  return (
    <div className="results__empty">
      <div className="results__empty-icon" aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <p className="results__empty-title">Ready to analyze</p>
      <p className="results__empty-text">
        Enter suspicious content above to begin your analysis.
      </p>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="results__empty" role="status" aria-live="polite">
      <div className="results__loading-ring" aria-hidden="true" />
      <p className="results__empty-title">Analyzing content</p>
      <p className="results__empty-text">
        Checking for phishing indicators and social-engineering patterns...
      </p>
    </div>
  );
}

function ErrorState({ message, onRetry }) {
  return (
    <div className="results__empty results__empty--error" role="alert">
      <div
        className="results__empty-icon results__empty-icon--error"
        aria-hidden="true"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <p className="results__empty-title">Analysis failed</p>
      <p className="results__empty-text">{message}</p>
      <button type="button" className="results__retry" onClick={onRetry}>
        Try again
      </button>
    </div>
  );
}

function ResultState({ result }) {
  const risk = result.risk_level?.toUpperCase() || "LOW";
  const riskClass = RISK_STYLES[risk] || RISK_STYLES.LOW;

  return (
    <div className="results__content">
      <div className="results__risk">
        <span className={`results__risk-badge ${riskClass}`}>
          {risk} RISK
        </span>
      </div>

      <div className="results__section">
        <p className="results__section-label">SUMMARY</p>
        <p className="results__section-text">{result.summary}</p>
      </div>

      <div className="results__section">
        <p className="results__section-label">RED FLAGS</p>
        <ul className="results__flags">
          {result.indicators?.map((indicator, index) => (
            <li key={index} className="results__flag">
              <strong>{indicator.type}:</strong> {indicator.explanation}
            </li>
          ))}
        </ul>
      </div>

      <div className="results__section results__section--action">
        <p className="results__section-label">RECOMMENDED ACTION</p>
        <ul className="results__flags">
          {result.recommendations?.map((recommendation, index) => (
            <li key={index} className="results__flag">
              {recommendation}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function ResultsPanel({
  status,
  result,
  errorMessage,
  onRetry,
}) {
  return (
    <section
      className="results"
      aria-labelledby="results-heading"
      aria-live="polite"
    >
      <p className="results__kicker" id="results-heading">
        ANALYSIS RESULT
      </p>

      {status === "idle" && <IdleState />}
      {status === "loading" && <LoadingState />}
      {status === "error" && (
        <ErrorState message={errorMessage} onRetry={onRetry} />
      )}
      {status === "success" && result && <ResultState result={result} />}
    </section>
  );
}
