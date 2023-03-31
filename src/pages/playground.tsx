import { useEffect, useState, useMemo } from "react";

import EnglishWordList from "../../public/static/correctenglishwords.json";
import SwedishWordList from "../../public/static/correctswedishwords.json";

import Upcoming from "@/components/Upcoming";
import Stats from "@/components/Stats";
import DisplayWord from "@/components/Displayword";
import InputWord from "@/components/Inputword";
import DisplayTree from "@/components/DisplayTree";

import useDisplayTree from "@/hooks/useDisplayTree";

import styles from "@/styles/Home.module.scss";
import useCalculateStats from "@/hooks/useStats";

const SweTree = () => {
  const [englishWordList, setEnglishWordList] = useState(EnglishWordList);
  const [swedishWordList, setSwedishWordList] = useState(SwedishWordList);
  const [userStats, setUserStats] = useState({
    currentProgress: 0,
    level: 1,
    levelReqXp: 10,
    waterGain: 1,
    totalWords: 0,
    planted: 0,
    regrow: 0,
  });
  const [formValue, setFormValue] = useState("");
  const [levelingUp, setLevelingUp] = useState(false);
  const [showCorrect, setShowCorrect] = useState<boolean | undefined>(
    undefined
  );
  const [previousWord, setPreviousWord] = useState("");

  const handleSubmit = (UserAttempt: string) => {
    setFormValue(UserAttempt);
    const userAnswer = UserAttempt.toLowerCase();
    const answerCharacters = userAnswer.split("");
    compareAnswer(answerCharacters, swedishWordList);
  };

  const compareAnswer = (
    characters: Array<string>,
    swedishWords: Array<Array<string>>
  ) => {
    let stringGiven = characters.join("");
    setPreviousWord(swedishWords[0][0]);

    if (stringGiven !== swedishWords[0][0]) {
      setShowCorrect(true);

      const newPosition = Math.min(5, swedishWords.length);
      let updatedEnglishWordList = [...englishWordList];
      let updatedSwedishWordList = [...swedishWordList];

      const englishWordToMove = updatedEnglishWordList.shift();
      const swedishWordToMove = updatedSwedishWordList.shift();

      if (englishWordToMove && swedishWordToMove) {
        updatedEnglishWordList.splice(newPosition, 0, englishWordToMove);
        updatedSwedishWordList.splice(newPosition, 0, swedishWordToMove);
      }

      setEnglishWordList(updatedEnglishWordList);
      setSwedishWordList(updatedSwedishWordList);
    } else {
      setShowCorrect(false);
      setUserStats((prevState) => ({
        ...prevState,
        totalWords: prevState.totalWords + 1,
        currentProgress: prevState.currentProgress + 1 * prevState.waterGain,
      }));

      let updatedEnglishWordList = [...englishWordList];
      updatedEnglishWordList.shift();
      setEnglishWordList(updatedEnglishWordList);

      let updatedSwedishWordList = [...swedishWordList];
      updatedSwedishWordList.shift();
      setSwedishWordList(updatedSwedishWordList);
    }
  };

  useCalculateStats(
    userStats,
    setUserStats,
    levelingUp,
    setLevelingUp,
    englishWordList.length,
    swedishWordList.length,
    SwedishWordList,
    EnglishWordList,
    setEnglishWordList,
    setSwedishWordList
  );

  const treeDisplay = useDisplayTree(userStats);

  return (
    <>
      <main className={styles.main}>
        <div className={styles.playground}>
          <Stats stats={userStats} />
          <div className={styles.center}>
            <header className={styles.header}>
              Swe<span className={styles.green}>Tree</span>
            </header>
            <DisplayWord topWord={englishWordList[0][0]} />
            <InputWord
              onSubmit={handleSubmit}
              correctSpelling={previousWord}
              showCorrect={showCorrect}
            />
          </div>
          <Upcoming englishwords={englishWordList} />
        </div>
        <DisplayTree treeDisplay={treeDisplay} />
        <div className={styles.credits}>
          <p>
            <a href="https://github.com/Vacannot/swetree">github</a>
          </p>
          <p> Made with love by Simon for my Star {"<"}3 </p>
        </div>
      </main>
    </>
  );
};

export default SweTree;
