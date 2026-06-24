import styles from "./HeroSection.module.css";

export const HeroSection = () => (
  <section className="section min-h-screen relative grid items-center pt-[110px] pb-[100px] overflow-hidden" id="home">
    <div className={styles.floatingPixels} aria-hidden="true">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div className={`wrap ${styles.heroGrid} grid items-center`}>
      <div>
        <div className="eyebrow">Craft beer · CRT glow · 2D game culture</div>
        <h1>Pixel Pint Arcade</h1>
        <p className="lead">
          A retro-game bar journal about sprite art, worn-out cartridges, cabinet sounds and
          the people still keeping classic play alive. Pull up to the counter, pick a machine
          and follow the stories behind the pixels.
        </p>
        <div className="actions flex flex-wrap gap-4 items-center">
          <a className="btn" href="#blog">
            Start Reading
          </a>
          <a className="btn secondary" href="#videos">
            Watch Videos
          </a>
        </div>
      </div>
      <div
        className={`${styles.pixelCard} ${styles.barScene}`}
        aria-label="Pixel art bar scene with arcade machines"
      >
        <div className={styles.sign}>Cold Beer · Hot Pixels</div>
        <div className="arcades flex gap-[22px] items-end mt-[70px]" aria-hidden="true">
          <div className={styles.cabinet}></div>
          <div className={styles.cabinet}></div>
          <div className={styles.cabinet}></div>
        </div>
        <div className={styles.beerCounter} aria-hidden="true"></div>
      </div>
    </div>
  </section>
);
