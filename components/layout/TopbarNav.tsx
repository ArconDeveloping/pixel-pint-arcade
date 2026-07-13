"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./Topbar.module.css";

type TopbarNavProps = {
  signedIn: boolean;
};

const navClassName = (active: boolean) =>
  active ? `${styles.navLink} active` : styles.navLink;

const AccountIcon = () => (
  <span
    className={`${styles.navIcon} ${styles.accountIcon}`}
    aria-hidden="true"
  />
);

const SoundIcon = () => (
  <span
    className={`${styles.navIcon} ${styles.soundIcon}`}
    aria-hidden="true"
  />
);

export const TopbarNav = ({ signedIn }: TopbarNavProps) => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isBlog = pathname.startsWith("/blog");
  const isAccount = pathname.startsWith("/account");
  const accountHref = signedIn ? "/account" : "/login";
  const accountLabel = signedIn ? "Account" : "Sign in";

  if (isHome) {
    return (
      <div className={`${styles.navLinks} flex items-center gap-[14px] flex-wrap justify-end`}>
        <a className={styles.navLink} href="#blog" data-nav-link>
          Blog
        </a>
        <a className={styles.navLink} href="#history" data-nav-link>
          Stories
        </a>
        <a className={styles.navLink} href="#videos" data-nav-link>
          Videos
        </a>
        <a className={styles.navLink} href="#dev" data-nav-link>
          Dev Lab
        </a>
        <Link
          aria-label={accountLabel}
          className={navClassName(isAccount)}
          href={accountHref}
          data-account-link
        >
          <AccountIcon />
          <span className={styles.navLabel}>{accountLabel}</span>
        </Link>
        <button className={styles.soundBtn} type="button" data-sound-toggle aria-label="Sound off">
          <SoundIcon />
          <span className={styles.navLabel} data-sound-label>
            Sound OFF
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className={`${styles.navLinks} flex items-center gap-[14px] flex-wrap justify-end`}>
      <Link className={styles.navLink} href="/#home">
        Home
      </Link>
      <Link className={navClassName(isBlog)} href="/blog">
        Blog
      </Link>
      <Link
        aria-label={accountLabel}
        className={navClassName(isAccount)}
        href={accountHref}
        data-account-link
      >
        <AccountIcon />
        <span className={styles.navLabel}>{accountLabel}</span>
      </Link>
    </div>
  );
};
