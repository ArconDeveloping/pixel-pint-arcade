import styles from "./HistorySection.module.css";

export const HistorySection = () => (
  <section className="section min-h-screen relative grid items-center pt-[110px] pb-[100px] overflow-hidden" id="history" data-sword-pickup="true">
    <div className={styles.swordPickup} id="swordPickup" aria-hidden="true"></div>
    <div className={`wrap ${styles.split} grid items-center`}>
      <div>
        <div className="eyebrow">Arcade timeline</div>
        <h2>How Constraints Became Style</h2>
        <p className="lead">
          Pixel Pint follows the thread from noisy cabinets and plastic cartridges to modern
          indie games that still chase the snap, timing and readability of classic 2D design.
        </p>
      </div>
      <div className="timeline grid gap-[18px] max-w-[820px]">
        <article className={`${styles.timelineItem} grid gap-5 items-start p-5 reveal`} data-reveal>
          <div className={styles.timelineYear}>1983</div>
          <div>
            <h3>Pixel as Language</h3>
            <p>Small sprites, sharp silhouettes and short loops turned technical limits into a visual grammar.</p>
          </div>
        </article>
        <article className={`${styles.timelineItem} grid gap-5 items-start p-5 reveal`} data-reveal>
          <div className={styles.timelineYear}>1991</div>
          <div>
            <h3>The 16-bit War</h3>
            <p>
              Faster chips, louder music and sharper mascots pushed arcade energy into every
              living room.
            </p>
          </div>
        </article>
        <article className={`${styles.timelineItem} grid gap-5 items-start p-5 reveal`} data-reveal>
          <div className={styles.timelineYear}>2026</div>
          <div>
            <h3>The New Retro Wave</h3>
            <p>
              Indie teams borrow old principles, then add modern controls, accessibility and
              sharper production pipelines.
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
);
