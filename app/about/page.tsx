import type { Metadata } from "next";
import Link from "next/link";

import styles from "./AboutPage.module.css";

export const metadata: Metadata = {
  title: "About | Pixel Pint Arcade",
  description:
    "About Pixel Pint Arcade, a blog about 2D games, consoles, hardware and retro culture.",
};

const topics = ["2D games", "Consoles", "Hardware", "Retro culture"];
const formats = ["Articles", "Videos", "Dev notes"];

export default function AboutPage() {
  return (
    <main className="page-shell">
      <div className="wrap">
        <div className={`page-topline ${styles.topline}`}>
          <div className="eyebrow">About the project</div>
          <Link className="pixel-link" href="/blog">
            Read the Blog
          </Link>
        </div>

        <section className={styles.intro}>
          <h1>Pixel Pint Arcade</h1>
          <p>
            Pixel Pint Arcade is a small editorial corner for people who like
            compact games, old hardware, arcade history and the practical craft
            behind interactive projects.
          </p>
        </section>

        <section className={styles.story} aria-labelledby="about-team-title">
          <div>
            <h2 id="about-team-title">Who is behind it</h2>
            <p>
              The project is run by an author-led team that collects notes,
              research and experiments around games, consoles and the culture
              that shaped them.
            </p>
          </div>
          <div>
            <h2>What it covers</h2>
            <p>
              Expect practical breakdowns, opinionated guides, development
              notes and references for anyone who enjoys pixel art games,
              retro machines and small playable experiments.
            </p>
          </div>
        </section>

        <section className={styles.columns} aria-label="Blog topics and formats">
          <div className={styles.panel}>
            <h2>Topics</h2>
            <ul>
              {topics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
          </div>
          <div className={styles.panel}>
            <h2>Formats</h2>
            <ul>
              {formats.map((format) => (
                <li key={format}>{format}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.contact} aria-labelledby="contact-title">
          <div>
            <h2 id="contact-title">Contact</h2>
            <p>
              For collaboration, corrections or future social links, use this
              block as the project contact placeholder.
            </p>
          </div>
          <div className={styles.actions}>
            <Link className="btn" href="/blog">
              Read the Blog
            </Link>
            <a
              className="btn secondary"
              href="https://www.youtube.com/"
              rel="noreferrer"
              target="_blank"
            >
              YouTube
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
