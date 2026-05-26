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
          <div className="eyebrow">YouTube & video format</div>
          <h2>Videos from the Bar</h2>
        </div>
        <p>
          Pin your latest episodes, trailers, streams, shorts and playlists here. All links
          go to YouTube.
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
            Latest episode: how pixels, beer and arcade machines became one culture
          </span>
        </a>
        <div className="video-list grid gap-[18px]">
          <article className={styles.videoCard}>
            <h3>One Game&apos;s Story</h3>
            <p>Long-form format: development, release, legacy, bugs, fan base.</p>
            <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
              Open YouTube
            </a>
          </article>
          <article className={styles.videoCard}>
            <h3>Hardware Table</h3>
            <p>Short reviews of consoles, controllers, cartridges, mods and rare devices.</p>
            <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
              Watch Playlist
            </a>
          </article>
          <article className={styles.videoCard}>
            <h3>Bar Stream</h3>
            <p>
              Live playthroughs, commentary, chat and game breakdowns right in the arcade bar
              atmosphere.
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
