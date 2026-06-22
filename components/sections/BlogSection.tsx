import Link from "next/link";

import styles from "./BlogSection.module.css";

export const BlogSection = () => (
  <section className="section min-h-screen relative grid items-center pt-[110px] pb-[100px] overflow-hidden" id="blog">
    <div className={styles.hangingJoysticks} aria-hidden="true">
      <div className={`${styles.joystick} ${styles.j1}`} data-joystick></div>
      <div className={`${styles.joystick} ${styles.j2}`} data-joystick></div>
      <div className={`${styles.joystick} ${styles.j3}`} data-joystick></div>
      <div className={`${styles.joystick} ${styles.j4}`} data-joystick></div>
    </div>
    <div className="wrap">
      <div className="section-title-row flex items-end justify-between">
        <div>
          <div className="eyebrow">Blog</div>
          <h2>Stories from the Cabinets</h2>
        </div>
        <div className={styles.titleAction}>
          <p>
            Field notes from the arcade floor: game history, hardware quirks, design
            breakdowns and personal essays on why 2D games still feel immediate.
          </p>
          <Link className={`btn secondary ${styles.blogCta}`} href="/blog">
            Read the Blog
          </Link>
        </div>
      </div>
      <div className={`${styles.cards} grid grid-cols-3`}>
        <article className={`${styles.featureCard} reveal`} data-reveal>
          <div className={`${styles.icon} ${styles.gamepad}`} aria-hidden="true"></div>
          <h3>2D Games</h3>
          <p>
            Platformers, beat &apos;em ups, shooters and puzzle games, read through their
            controls, rhythm, level flow and sprite craft.
          </p>
        </article>
        <article className={`${styles.featureCard} ${styles.obstacleCard} reveal`} data-reveal data-runner-mode="jump-card">
          <div className={`${styles.icon} ${styles.console}`} aria-hidden="true"></div>
          <h3>Consoles</h3>
          <p>NES, SNES, Mega Drive, Game Boy, PlayStation and the hardware that made living rooms louder.</p>
        </article>
        <article className={`${styles.featureCard} reveal`} data-reveal>
          <div className={`${styles.icon} ${styles.device}`} aria-hidden="true"></div>
          <h3>Hardware</h3>
          <p>
            Controllers, cartridges, CRTs, flash carts and mods, with the small details that
            change how a game feels in your hands.
          </p>
        </article>
      </div>
      <div className={`${styles.stats} grid grid-cols-3 gap-[14px] mt-7`}>
        <div className={styles.stat}>
          <strong>1980s</strong>
          <span>arcade DNA</span>
        </div>
        <div className={styles.stat}>
          <strong>1990s</strong>
          <span>console wars</span>
        </div>
        <div className={styles.stat}>
          <strong>Today</strong>
          <span>new retro</span>
        </div>
      </div>
    </div>
  </section>
);
