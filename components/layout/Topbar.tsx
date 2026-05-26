"use client";

import styles from "./Topbar.module.css";

export const Topbar = () => (
  <header className={styles.topbar}>
    <nav className={`${styles.nav} flex items-center justify-between gap-[18px] min-h-[70px]`}>
      <a className={styles.logo} href="#home" aria-label="Pixel Pint Arcade">
        <span className={styles.logoMark} aria-hidden="true"></span>
        <span>Pixel Pint Arcade</span>
      </a>
      <div className={`${styles.navLinks} flex items-center gap-[14px] flex-wrap justify-end`}>
        <a className={styles.navLink} href="#blog" data-nav-link>Blog</a>
        <a className={styles.navLink} href="#history" data-nav-link>Stories</a>
        <a className={styles.navLink} href="#videos" data-nav-link>Videos</a>
        <a className={styles.navLink} href="#dev" data-nav-link>Dev Lab</a>
        <button className={styles.soundBtn} type="button" data-sound-toggle>
          Sound OFF
        </button>
      </div>
    </nav>
  </header>
);
