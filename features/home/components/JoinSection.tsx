import Link from "next/link";

import styles from "./JoinSection.module.css";

export const JoinSection = () => (
  <section className={`section ${styles.jumpSection} min-h-screen relative grid items-center pt-[110px] pb-[100px] overflow-hidden`} id="join" data-runner-mode="jump">
    <div className="wrap">
      <div className={styles.ctaBox}>
        <div className="eyebrow">Press Start</div>
        <h2>Pull Up a Stool</h2>
        <p>
          Pixel Pint Arcade is a place for people who remember the weight of a cartridge,
          the hum of a cabinet and the first level they learned by heart. Come for the games,
          stay for the stories around them.
        </p>
        <div className="actions flex flex-wrap gap-4 items-center" style={{ justifyContent: "center" }}>
          <a className="btn" href="#home">
            Back to Top
          </a>
          <Link
            className="btn secondary"
            href="/blog"
          >
            Read the Blog
          </Link>
        </div>
      </div>
    </div>
  </section>
);
