import teamPhoto from "../assets/meet_the_team.png";

export default function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <details className="header__team">
          <summary className="header__team-button">
            MEET THE TEAM
          </summary>

          <div className="header__team-menu">
            <img
              src={teamPhoto}
              alt="The Sentra development team"
              className="header__team-photo"
            />

            <div className="header__team-member">
              <span className="header__team-name">
                Nick Hefter
              </span>

              <p className="header__team-description">
                Cybersecurity major at the University of Tampa with interests in
                cybersecurity, threat analysis, and digital security. His
                contributions to Sentra included developing the frontend,
                creating the GitHub repository, and coordinating project
                planning and development.
              </p>

              <a
                className="header__team-link"
                href="https://www.linkedin.com/in/nicholas-hefter/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn ↗
              </a>
            </div>

            <div className="header__team-member">
              <span className="header__team-name">
                Kolton Kimanyen
              </span>

              <p className="header__team-description">
                Cybersecurity major at the University of Tampa and backend
                developer on Sentra. He built the phishing detection engine and
                the logic used to identify red flags such as urgency tactics,
                fake links, and impersonation in real time.
              </p>

              <a
                className="header__team-link"
                href="https://www.linkedin.com/in/kolton-kimanyen-279a75340"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn ↗
              </a>
            </div>

            <div className="header__team-member">
              <span className="header__team-name">
                Nicholas Snyder
              </span>

              <p className="header__team-description">
                Cybersecurity student at the University of Tampa focused on
                security analysis, phishing detection, and AI-powered security
                tools. He helped develop Sentra by building the AI integration
                and API functionality that analyzes suspicious messages and
                returns risk ratings, explanations, and recommended actions.
              </p>

              <a
                className="header__team-link"
                href="https://www.linkedin.com/in/nicholas-snyder-321003351"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>
        </details>

        <div className="header__region">
          <span
            className="header__region-dot"
            aria-hidden="true"
          />
          U.S.
        </div>

        <div
          className="header__status"
          role="status"
        >
          <span
            className="header__status-dot"
            aria-hidden="true"
          />
          SYSTEM ONLINE
        </div>
      </div>
    </header>
  );
}