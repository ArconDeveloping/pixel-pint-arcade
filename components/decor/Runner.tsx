import styles from "./Runner.module.css";

export const Runner = () => (
  <div className={styles.runner} data-runner aria-hidden="true">
    <span className={styles.head}></span>
    <span className={styles.body}></span>
    <span className={`${styles.arm} ${styles.a1}`}></span>
    <span className={`${styles.arm} ${styles.a2}`}></span>
    <span className={`${styles.leg} ${styles.l1}`}></span>
    <span className={`${styles.leg} ${styles.l2}`}></span>
    <span className={styles.sword}></span>
  </div>
);
