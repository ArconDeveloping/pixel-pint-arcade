import styles from "./DecorLayers.module.css";

export const DecorLayers = () => (
  <>
    <div className={styles.noise} aria-hidden="true"></div>
    <div className={styles.trackLayer} aria-hidden="true">
      <div className={styles.runnerPath}></div>
    </div>
  </>
);
