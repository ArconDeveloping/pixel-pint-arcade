import Link from "next/link";

import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className="page-shell">
      <div className="wrap">
        <section className={styles.panel}>
          <div className="eyebrow">404</div>
          <h1>Page not found</h1>
          <p>
            This route does not have a playable screen yet. Head back home or
            keep reading the latest Pixel Pint Arcade notes.
          </p>
          <div className={styles.actions}>
            <Link className="btn" href="/">
              Back home
            </Link>
            <Link className="btn secondary" href="/blog">
              Read the Blog
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
