import type { ArticleHeading } from "@/features/blog/types";

import styles from "./TableOfContents.module.css";

type TableOfContentsProps = {
  headings: ArticleHeading[];
};

export const TableOfContents = ({ headings }: TableOfContentsProps) => {
  if (headings.length < 2) {
    return null;
  }

  return (
    <nav className={styles.toc} aria-labelledby="table-of-contents-title">
      <h2 id="table-of-contents-title">Contents</h2>
      <ol>
        {headings.map((heading) => (
          <li className={styles[`level${heading.level}`]} key={heading.id}>
            <a href={`#${heading.id}`}>{heading.text}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
};
