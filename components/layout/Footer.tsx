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
      </div>
      <p>© 2026 · Insert Coin</p>
    </div>
  </footer>
);
