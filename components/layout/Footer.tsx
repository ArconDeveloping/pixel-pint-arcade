import Link from "next/link";

import styles from "./Footer.module.css";

export const Footer = () => (
  <footer className={styles.footer}>
    <div className={`${styles.footerGrid} grid grid-cols-[1fr_auto] gap-6 items-center`}>
      <div>
        <a className={styles.logo} href="#home">
          <span className={styles.logoMark} aria-hidden="true"></span>
          <span>Pixel Pint Arcade</span>
        </a>
        <p style={{ marginTop: "14px" }}>
          Blog, videos and dev lab about 2D games, consoles and retro culture.
        </p>
        <nav className={styles.links} aria-label="Footer navigation">
          <Link href="/blog">Blog</Link>
          <Link href="/about">About</Link>
          <a href="https://www.youtube.com/" rel="noreferrer" target="_blank">
            YouTube
          </a>
        </nav>
      </div>
      <p>© 2026 · Insert Coin</p>
    </div>
  </footer>
);
