export default function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <details className="header__team">
          <summary className="header__team-button">
            MEET THE TEAM
          </summary>

          <div className="header__team-menu">
            <div className="header__team-member">
              <span>Team Member 1</span>
              <small>Backend / Cybersecurity</small>
            </div>

            <div className="header__team-member">
              <span>Team Member 2</span>
              <small>Frontend / UI</small>
            </div>

            <div className="header__team-member">
              <span>Team Member 3</span>
              <small>AI / Integration</small>
            </div>
          </div>
        </details>

        <div className="header__region">
          <span className="header__region-dot" aria-hidden="true" />
          U.S.
        </div>

        <div className="header__status" role="status">
          <span className="header__status-dot" aria-hidden="true" />
          SYSTEM ONLINE
        </div>
      </div>
    </header>
  );
}