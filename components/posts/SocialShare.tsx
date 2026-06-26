"use client";

import { useState } from "react";

import styles from "./SocialShare.module.css";

type SocialShareProps = {
  title: string;
  url: string;
};

export const SocialShare = ({ title, url }: SocialShareProps) => {
  const [copied, setCopied] = useState(false);
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className={styles.share} aria-labelledby="share-title">
      <h2 id="share-title">Share</h2>
      <div className={styles.actions}>
        <button
          aria-label="Copy article link"
          className={`${styles.action} ${styles.copyAction}`}
          onClick={copyLink}
          title="Copy article link"
          type="button"
        >
          <span aria-hidden="true" className={styles.copyIcon}></span>
        </button>
        <a
          className={styles.action}
          href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
          aria-label="Share on X"
          rel="noreferrer"
          target="_blank"
          title="Share on X"
        >
          X
        </a>
        <a
          className={styles.action}
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          aria-label="Share on Facebook"
          rel="noreferrer"
          target="_blank"
          title="Share on Facebook"
        >
          f
        </a>
        <a
          className={styles.action}
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          aria-label="Share on LinkedIn"
          rel="noreferrer"
          target="_blank"
          title="Share on LinkedIn"
        >
          in
        </a>
      </div>
      <span className={styles.status} aria-live="polite">
        {copied ? "Copied" : ""}
      </span>
    </section>
  );
};
