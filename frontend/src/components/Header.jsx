export default function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <span className="header__logo">
          SENTRA
        </span>
        <div className="header__status" role="status">
          <span className="header__status-dot" aria-hidden="true" />
          SYSTEM ONLINE
        </div>
      </div>
    </header>
  );
}
