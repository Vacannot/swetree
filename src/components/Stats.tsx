import styles from "@/styles/Stats.module.scss";
import React from "react";

interface IStats {
  stats: {
    currentProgress: number;
    level: number;
    waterGain: number;
    totalWords: number;
    planted: number;
    regrow: number;
    levelReqXp: number;
  };
}

const Stats: React.FC<IStats> = ({ stats }) => {
  return (
    <div className={styles.sign}>
      <div className={styles.header}>Progress</div>
      <div className={styles.loading}>
        <div className={styles.loadingbar}>
          <div
            className={styles.bar}
            style={{
              height: `${100 * (stats.currentProgress / stats.levelReqXp)}%`,
            }}
          ></div>
        </div>
      </div>
      <div className={styles.title}>Level:</div>
      <div className={styles.value}>{stats.level}</div>
      <div className={styles.title}>Water per word:</div>
      <div className={styles.value}>{stats.waterGain}</div>
      <div className={styles.title}>Total Words Passed:</div>
      <div className={styles.value}>{stats.totalWords}</div>
      <div className={styles.title}>Trees Planted:</div>
      <div className={styles.value}>{stats.planted}</div>
      <div className={styles.title}>Regrow</div>
      <div className={styles.value}>{stats.regrow}</div>
    </div>
  );
};

export default Stats;
