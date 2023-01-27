import styles from "@/styles/Home.module.scss";
import Upcoming from "@/components/Upcoming";
import Stats from "@/components/Stats";
import DisplayWord from "@/components/Displayword";
import InputWord from "@/components/Inputword";
import EnglishWordList from "../../public/static/correctenglishwords.json";
import { useEffect, useState } from "react";

const Playground = () => {
  const [englishWordList, setWordList] = useState(EnglishWordList);

  const removeTopWord = () => {
    let updatedWordList = [...englishWordList];
    updatedWordList.shift();
    setWordList(updatedWordList);
  };

  return (
    <>
      <main className={styles.main}>
        <div className={styles.playground}>
          <Stats />
          <div className={styles.center}>
            <header className={styles.header}>
              Swe<span className={styles.green}>Tree</span>
              <button onClick={removeTopWord}>asdasd</button>
            </header>
            <DisplayWord topWord={englishWordList[0][0]} />
            <InputWord />
          </div>

          <Upcoming englishwords={englishWordList} />
        </div>
      </main>
    </>
  );
};

export default Playground;
