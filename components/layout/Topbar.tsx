import Link from "next/link";

import { getCurrentSession } from "@/server/auth";
import { LogoMark } from "./LogoMark";
import { TopbarNav } from "./TopbarNav";
import styles from "./Topbar.module.css";

export const Topbar = async () => {
  const session = await getCurrentSession();

  return (
    <header className={styles.topbar}>
      <nav className={`${styles.nav} flex items-center justify-between gap-[18px] min-h-[70px]`}>
        <Link className={styles.logo} href="/#home" aria-label="Pixel Pint Arcade">
          <LogoMark className={styles.logoMarkSvg} />
          <span>Pixel Pint Arcade</span>
        </Link>
        <TopbarNav signedIn={Boolean(session?.user)} />
      </nav>
    </header>
  );
};
