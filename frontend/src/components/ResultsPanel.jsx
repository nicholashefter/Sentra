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
      <p className="results__empty-title">Awaiting Input</p>
      <p className="results__empty-text">
        Submit suspicious content above to run an analysis.
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
      <div className="results__empty-icon results__empty-icon--error" aria-hidden="true">
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
  const riskClass = RISK_STYLES[result.riskLevel] ?? RISK_STYLES.MEDIUM;

  return (
    <div className="results__content">
      <div className="results__grid">
        <div className="results__stat">
          <p className="results__stat-label">VERDICT</p>
          <p className="results__stat-value results__stat-value--verdict">
            {result.verdict}
          </p>
        </div>

        <div className="results__stat">
          <p className="results__stat-label">RISK LEVEL</p>
          <span className={`results__risk-badge ${riskClass}`}>
            {result.riskLevel}
          </span>
        </div>

        <div className="results__stat">
          <p className="results__stat-label">THREAT TYPE</p>
          <p className="results__stat-value">{result.threatType}</p>
        </div>

        <div className="results__stat">
          <p className="results__stat-label">CONFIDENCE</p>
          <div className="results__confidence">
            <div className="results__confidence-track">
              <div
                className="results__confidence-fill"
                style={{ width: `${result.confidence}%` }}
              />
            </div>
            <span className="results__stat-value">{result.confidence}%</span>
          </div>
        </div>
      </div>

      <div className="results__section">
        <p className="results__section-label">EXPLANATION</p>
        <p className="results__section-text">{result.explanation}</p>
      </div>

      <div className="results__section">
        <p className="results__section-label">RED FLAGS</p>
        <ul className="results__flags">
          {result.redFlags.map((flag) => (
            <li key={flag} className="results__flag">
              {flag}
            </li>
          ))}
        </ul>
      </div>

      <div className="results__section results__section--action">
        <p className="results__section-label">RECOMMENDED ACTION</p>
        <p className="results__section-text">{result.recommendedAction}</p>
      </div>
    </div>
  );
}

export default function ResultsPanel({ status, result, errorMessage, onRetry }) {
  return (
    <section className="results" aria-labelledby="results-heading" aria-live="polite">
      <p className="results__kicker" id="results-heading">
        ANALYSIS RESULT
      </p>

      {status === "idle" && <IdleState />}
      {status === "loading" && <LoadingState />}
      {status === "error" && <ErrorState message={errorMessage} onRetry={onRetry} />}
      {status === "success" && result && <ResultState result={result} />}
    </section>
  );
}
