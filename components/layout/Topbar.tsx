"use client";

export const Topbar = () => (
  <header className="topbar">
    <nav className="nav flex items-center justify-between gap-[18px] min-h-[70px]">
      <a className="logo" href="#home" aria-label="Pixel Pint Arcade">
        <span className="logo-mark" aria-hidden="true"></span>
        <span>Pixel Pint Arcade</span>
      </a>
      <div className="nav-links flex items-center gap-[14px] flex-wrap justify-end">
        <a href="#blog">Blog</a>
        <a href="#history">Stories</a>
        <a href="#videos">Videos</a>
        <a href="#dev">Dev Lab</a>
        <button className="sound-btn" id="soundBtn" type="button">
          Sound OFF
        </button>
      </div>
    </nav>
  </header>
);
