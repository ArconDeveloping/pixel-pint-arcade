import styles from "./VideosSection.module.css";

export const VideosSection = () => (
  <section className="section min-h-screen relative grid items-center pt-[110px] pb-[100px] overflow-hidden" id="videos">
    <div className={styles.battleLayer} aria-hidden="true">
      <div className={`${styles.monster} ${styles.monsterLeft} ${styles.m1}`}>
        <span></span>
      </div>
      <div className={`${styles.monster} ${styles.monsterLeft} ${styles.m2}`}>
        <span></span>
      </div>
      <div className={`${styles.monster} ${styles.monsterRight} ${styles.m3}`}>
        <span></span>
      </div>
      <div className={`${styles.monster} ${styles.monsterRight} ${styles.m4}`}>
        <span></span>
      </div>
    </div>
    <div className="wrap">
      <div className="section-title-row flex items-end justify-between">
        <div>
          <div className="eyebrow">Video shelf</div>
          <h2>Episodes from the Bar</h2>
        </div>
        <p>
          Cabinet captures, hardware close-ups, short reviews and relaxed play sessions from
          the same corner of the bar where the CRTs never sleep.
        </p>
      </div>
      <div className={`${styles.videosGrid} grid`}>
        <a
          className={styles.videoScreen}
          href="https://www.youtube.com/"
          target="_blank"
          rel="noreferrer"
          aria-label="Open YouTube"
        >
          <span>
            Now playing: sprite craft, cold taps and arcade stories after hours
          </span>
        </a>
        <div className="video-list grid gap-[18px]">
          <article className={styles.videoCard}>
            <h3>One Game&apos;s Story</h3>
            <p>Launch context, level structure, strange bugs, fan myths and the legacy a game leaves behind.</p>
            <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
              Open YouTube
            </a>
          </article>
          <article className={styles.videoCard}>
            <h3>Hardware Table</h3>
            <p>Hands-on looks at consoles, controllers, cartridges, mods and the small fixes that matter.</p>
            <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
              Watch Playlist
            </a>
          </article>
          <article className={styles.videoCard}>
            <h3>After-Hours Plays</h3>
            <p>
              Casual runs, score chasing, commentary and deep dives once the last stool is
              pushed under the counter.
            </p>
            <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
              Go to Streams
            </a>
          </article>
        </div>
      </div>
    </div>
  </section>
);
