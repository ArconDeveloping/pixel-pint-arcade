import styles from "./HistorySection.module.css";

export const HistorySection = () => (
  <section className="section min-h-screen relative grid items-center pt-[110px] pb-[100px] overflow-hidden" id="history" data-sword-pickup="true">
    <div className={styles.swordPickup} id="swordPickup" aria-hidden="true"></div>
    <div className={`wrap ${styles.split} grid items-center`}>
      <div>
        <div className="eyebrow">Content presentation example</div>
        <h2>From Cartridge to Indie</h2>
        <p className="lead">
          Sections work as showcases for the future blog. You can guide the reader through
          eras, consoles, studios, genres and technical constraints.
        </p>
      </div>
      <div className="timeline grid gap-[18px] max-w-[820px]">
        <article className={`${styles.timelineItem} grid gap-5 items-start p-5 reveal`} data-reveal>
          <div className={styles.timelineYear}>1983</div>
          <div>
            <h3>Pixel as Language</h3>
            <p>Games learned to speak through shape, colour, tile and sound. Constraints became style.</p>
          </div>
        </article>
        <article className={`${styles.timelineItem} grid gap-5 items-start p-5 reveal`} data-reveal>
          <div className={styles.timelineYear}>1991</div>
          <div>
            <h3>The 16-bit War</h3>
            <p>
              Speed, music, mascots, arcade energy and home consoles turned 2D into mass
              culture.
            </p>
          </div>
        </article>
        <article className={`${styles.timelineItem} grid gap-5 items-start p-5 reveal`} data-reveal>
          <div className={styles.timelineYear}>2026</div>
          <div>
            <h3>The New Retro Wave</h3>
            <p>
              Indie developers take old principles and build fresh games with modern UX.
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
);
