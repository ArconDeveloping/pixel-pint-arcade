export const BlogSection = () => (
  <section className="section min-h-screen relative grid items-center pt-[110px] pb-[100px] overflow-hidden" id="blog">
    <div className="hanging-joysticks" aria-hidden="true">
      <div className="joystick j1"></div>
      <div className="joystick j2"></div>
      <div className="joystick j3"></div>
      <div className="joystick j4"></div>
    </div>
    <div className="wrap">
      <div className="section-title-row flex items-end justify-between">
        <div>
          <div className="eyebrow">Blog inside the project</div>
          <h2>Stories, Hardware and the Spirit of 2D</h2>
        </div>
        <p>
          The landing does not reveal the blog in full. It sells the idea: articles,
          breakdowns, archives and personal notes on 2D gaming culture will live here.
        </p>
      </div>
      <div className="cards grid grid-cols-3">
        <article className="feature-card reveal">
          <div className="icon gamepad" aria-hidden="true"></div>
          <h3>2D Games</h3>
          <p>
            Genre history, visual breakdowns, mechanics, levels, music and design decisions
            that still hold up today.
          </p>
        </article>
        <article className="feature-card reveal obstacle-card" data-runner-mode="jump-card">
          <div className="icon console" aria-hidden="true"></div>
          <h3>Consoles</h3>
          <p>NES, SNES, Mega Drive, Game Boy, PlayStation and other systems — no museum dust.</p>
        </article>
        <article className="feature-card reveal">
          <div className="icon device" aria-hidden="true"></div>
          <h3>Hardware</h3>
          <p>
            Controllers, cartridges, CRT monitors, flash carts, mods and devices that changed
            the way we play.
          </p>
        </article>
      </div>
      <div className="stats grid grid-cols-3 gap-[14px] mt-7">
        <div className="stat">
          <strong>8-bit</strong>
          <span>cultural roots</span>
        </div>
        <div className="stat">
          <strong>16-bit</strong>
          <span>the golden era</span>
        </div>
        <div className="stat">
          <strong>2D</strong>
          <span>the main theme</span>
        </div>
      </div>
    </div>
  </section>
);
