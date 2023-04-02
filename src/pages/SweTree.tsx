import { useState } from "react";

import EnglishWordList from "../../public/static/correctenglishwords.json";
import SwedishWordList from "../../public/static/correctswedishwords.json";

import Upcoming from "@/components/Upcoming";
import Stats from "@/components/Stats";
import DisplayWord from "@/components/Displayword";
import InputWord from "@/components/Inputword";
import DisplayTree from "@/components/DisplayTree";

import useDisplayTree from "@/hooks/useDisplayTree";

import styles from "@/styles/Home.module.scss";
import useCalculateStats from "@/hooks/useCalculateStats";
import useCompareAnswers from "@/hooks/useCompareAnswer";

interface UserStats {
  currentProgress: number;
  level: number;
  levelReqXp: number;
  waterGain: number;
  totalWords: number;
  planted: number;
  regrow: number;
}

const SweTree = () => {
  const [englishWordList, setEnglishWordList] = useState(EnglishWordList);
  const [swedishWordList, setSwedishWordList] = useState(SwedishWordList);
  const [userStats, setUserStats] = useState<UserStats>({
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

  const { compareAnswer } = useCompareAnswers({
    englishWordList,
    setEnglishWordList,
    swedishWordList,
    setSwedishWordList,
    setUserStats,
    setShowCorrect,
    setPreviousWord,
  });

  useCalculateStats(
    userStats,
    setUserStats,
    levelingUp,
    setLevelingUp,
    SwedishWordList,
    EnglishWordList,
    setEnglishWordList,
    setSwedishWordList
  );

  const treeDisplay = useDisplayTree(userStats);

  return (
    <>
      <div className={styles.main}>
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
      </div>
    </>
  );
};

export default SweTree;
