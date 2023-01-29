import styles from "@/styles/Upcoming.module.scss";
import React, { useEffect, useState } from "react";

interface UpcomingProps {
  englishwords: Array<Array<string>>;
}

const Upcoming: React.FC<UpcomingProps> = ({ englishwords }) => {
  /*   useEffect(() => {
    englishwords.shift();
  }, []); */

  return (
    <div className={styles.sign}>
      <div className={styles.header}>Upcoming Words</div>
      <div className={styles.upcoming} id="upcoming">
        {englishwords.map((word, index) => (
          <div key={index}>{word}</div>
        ))}
      </div>
    </div>
  );
};
export default Upcoming;
