export const Footer = () => (
  <footer className="footer">
    <div className="footer-grid grid grid-cols-[1fr_auto] gap-6 items-center">
      <div>
        <a className="logo" href="#home">
          <span className="logo-mark" aria-hidden="true"></span>
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
