import Link from "next/link";

import styles from "./Breadcrumbs.module.css";

export type BreadcrumbItem = {
  href?: string;
  label: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => (
  <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
    <ol>
      {items.map((item, index) => {
        const isCurrent = index === items.length - 1;

        return (
          <li aria-current={isCurrent ? "page" : undefined} key={item.label}>
            {item.href && !isCurrent ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span>{item.label}</span>
            )}
          </li>
        );
      })}
    </ol>
  </nav>
);
