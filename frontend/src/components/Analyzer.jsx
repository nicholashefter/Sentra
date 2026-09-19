export default function Analyzer({ value, onChange, onSubmit, isLoading }) {
  const isEmpty = value.trim().length === 0;

  function handleSubmit(event) {
    event.preventDefault();
    if (isEmpty || isLoading) return;
    onSubmit();
  }

  return (
    <section className="analyzer" aria-labelledby="analyzer-heading">
      <p className="analyzer__kicker">THREAT ANALYZER</p>
      <h2 id="analyzer-heading" className="analyzer__title">
        Submit suspicious content
      </h2>

      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="threat-input" className="sr-only">
          Suspicious email, text message, or link
        </label>
        <textarea
          id="threat-input"
          className="analyzer__textarea"
          placeholder="Paste a suspicious email, text message, or link here..."
          value={value}
          onChange={(event) => onChange(event.target.value)}
          disabled={isLoading}
          rows={8}
        />

        <div className="analyzer__footer">
          <span className="analyzer__hint">
            Nothing you submit here is stored or shared.
          </span>
          <button
            type="submit"
            className="analyzer__submit"
            disabled={isEmpty || isLoading}
          >
            {isLoading ? (
              <>
                <span className="analyzer__spinner" aria-hidden="true" />
                Analyzing...
              </>
            ) : (
              <>ANALYZE THREAT →</>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}
