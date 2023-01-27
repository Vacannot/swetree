import styles from "@/styles/Stats.module.scss";
import React from "react";
import { useState } from "react";

const Stats = () => {
  const [level, setLevel] = useState(0);
  const [waterGain, setWaterGain] = useState(0);
  const [wordsPassed, setWordsPassed] = useState(0);
  const [treesPlanted, setTreesPlanted] = useState(0);
  const [regrow, setRegrow] = useState(0);

  return (
    <div className={styles.sign}>
      <div className={styles.header}>Progress</div>
      <div className={styles.loading}>
        <div className={styles.loadingbar}>
          <div className={styles.loadingsectionshorter} id="loading1"></div>
          <div className={styles.loadingsectionblue} id="loading2"></div>
          <div className={styles.loadingsection} id="loading3"></div>
          <div className={styles.loadingsectionblue} id="loading4"></div>
          <div className={styles.loadingsection} id="loading5"></div>
          <div className={styles.loadingsectionblue} id="loading6"></div>
          <div className={styles.loadingsectionshort} id="loading7"></div>
        </div>
      </div>
      <div className={styles.title}>Level:</div>
      <div className={styles.value}>{level}</div>
      <div className={styles.title}>Water per word:</div>
      <div className={styles.value}>{waterGain}</div>
      <div className={styles.title}>Total Words Passed:</div>
      <div className={styles.value}>{wordsPassed}</div>
      <div className={styles.title}>Trees Planted:</div>
      <div className={styles.value}>{treesPlanted}</div>
      <div className={styles.title}>Regrow</div>
      <div className={styles.value}>{regrow}</div>
    </div>
  );
};

export default Stats;
