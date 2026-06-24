import styles from "./DevSection.module.css";

export const DevSection = () => (
  <section className="section min-h-screen relative grid items-center pt-[110px] pb-[100px] overflow-hidden" id="dev">
    <div className={`wrap ${styles.devLab} grid items-center`}>
      <div className={styles.devMachine} aria-label="Pixel art dev computer"></div>
      <div className={styles.devCopy}>
        <div className="eyebrow">Retro Game Dev Lab</div>
        <h2>Building New Games with Old-School Bite</h2>
        <p className="lead">
          Notes for developers who love tight hitboxes, readable sprites and crunchy feedback,
          but still ship with modern tools, clean pipelines and player-friendly UX.
        </p>
        <ul>
          <li>Dev diaries that show prototypes, tradeoffs and what changed after playtests.</li>
          <li>Interviews with pixel artists, composers, designers and solo developers.</li>
          <li>Breakdowns of engines, art workflows, physics, level design and launch strategy.</li>
        </ul>
      </div>
    </div>
  </section>
);
