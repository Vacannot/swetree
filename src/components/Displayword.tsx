import React from "react";
import styles from "@/styles/DisplayWord.module.scss";

interface DisplayWordProps {
  topWord: string;
}

const DisplayWord: React.FC<DisplayWordProps> = ({ topWord }) => {
  return (
    <div className={styles.center}>
      <div className={styles.displayword}>{topWord}</div>
      <div>Press enter to submit your word!</div>
    </div>
  );
};

export default DisplayWord;
