import styles from "@/styles/Upcoming.module.scss";
import React, { useState } from "react";
import englishwords from "../../public/static/correctenglishwords.json";

const Upcoming: React.FC = () => {
  const [wordList, setWordList] = useState(englishwords);

  const removeTopWord = () => {
    const updatedWordList = [...wordList];
    updatedWordList.shift();
    setWordList(updatedWordList);
  };

  return (
    <div className={styles.sign}>
      <div className={styles.header}>Upcoming Words</div>
      <div className={styles.upcoming} id="upcoming">
        {wordList.map((word, index) => (
          <div key={index}>{word}</div>
        ))}
      </div>
    </div>
  );
};

export default Upcoming;
