import type { ArticleBlock } from "@/features/blog/types";

import styles from "./ArticleBody.module.css";

type ArticleBodyProps = {
  blocks: ArticleBlock[];
};

export const ArticleBody = ({ blocks }: ArticleBodyProps) => (
  <div className={styles.content}>
    {blocks.map((block, index) => {
      if (block.type === "heading") {
        const Heading = block.level === 2 ? "h2" : "h3";

        return (
          <Heading className={styles.heading} id={block.id} key={block.id}>
            {block.text}
          </Heading>
        );
      }

      return (
        <p className={styles.paragraph} key={`${block.text}-${index}`}>
          {block.text}
        </p>
      );
    })}
  </div>
);
