"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./Topbar.module.css";

type TopbarNavProps = {
  signedIn: boolean;
};

const navClassName = (active: boolean) =>
  active ? `${styles.navLink} active` : styles.navLink;

export const TopbarNav = ({ signedIn }: TopbarNavProps) => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isAbout = pathname.startsWith("/about");
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
        <Link className={navClassName(isAbout)} href="/about">
          About
        </Link>
        <Link className={navClassName(isAccount)} href={accountHref}>
          {accountLabel}
        </Link>
        <button className={styles.soundBtn} type="button" data-sound-toggle>
          Sound OFF
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
      <Link className={navClassName(isAbout)} href="/about">
        About
      </Link>
      <Link className={navClassName(isAccount)} href={accountHref}>
        {accountLabel}
      </Link>
    </div>
  );
};
