import heroImage from "../assets/hero.png";

export default function Hero() {
  return (
    <section className="hero">
      <img
        src={heroImage}
        alt="Sentra shield"
        className="hero__logo"
      />

      <h1 className="hero__brand">SENTRA</h1>

      <p className="hero__eyebrow">
        AI-POWERED AGENT THREAT ANALYSIS
      </p>

      <h2 className="hero__headline">
        Detect the threat before it gets you.
      </h2>

      <p className="hero__subtext">
        AI-powered analysis for suspicious emails, messages, and links.
      </p>
    </section>
  );
}