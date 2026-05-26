export const HeroSection = () => (
  <section className="section" id="home">
    <div className="floating-pixels" aria-hidden="true">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div className="wrap hero-grid">
      <div>
        <div className="eyebrow">16-bit beer bar · arcade blog · new retro games</div>
        <h1>Beer Bar with Arcade Machines</h1>
        <p className="lead">
          A landing for a project about 2D games, consoles, hardware and the people who keep
          retro alive. Bar atmosphere, CRT noise, chiptune and a pixel character running
          through the entire site.
        </p>
        <div className="actions">
          <a className="btn" href="#blog">
            Insert Coin
          </a>
          <a className="btn secondary" href="#videos">
            Watch Videos
          </a>
        </div>
      </div>
      <div
        className="pixel-card bar-scene"
        aria-label="Pixel art bar scene with arcade machines"
      >
        <div className="sign">Cold Beer · Hot Pixels</div>
        <div className="arcades" aria-hidden="true">
          <div className="cabinet"></div>
          <div className="cabinet"></div>
          <div className="cabinet"></div>
        </div>
        <div className="beer-counter" aria-hidden="true"></div>
      </div>
    </div>
  </section>
);
