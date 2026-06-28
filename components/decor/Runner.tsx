import styles from "./Runner.module.css";

export const Runner = () => (
  <div className={styles.runner} data-runner aria-hidden="true">
    <span className={styles.sprite}></span>
    <span className={styles.slash}></span>
  </div>
);
