import styles from "@/styles/Home.module.scss";
import Upcoming from "@/components/Upcoming";
import Stats from "@/components/Stats";
import DisplayWord from "@/components/Displayword";
import InputWord from "@/components/Inputword";
import EnglishWordList from "../../public/static/correctenglishwords.json";
import SwedishWordList from "../../public/static/correctswedishwords.json";
import { useEffect, useState } from "react";

const SweTree = () => {
  const originalEnglishWordList = EnglishWordList;
  const originalSwedishWordList = SwedishWordList;
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
  const [misaligned, setMisaligned] = useState<
    { character: string; originalIndex: number; correctIndex: number }[]
  >([]);

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
    let correctSpelling = false;
    let correctLetters = false;
    let misaligned = [];
    let stringGiven = characters.join("");

    //checks if the given answer is wrong, if it's not proceed to the next word.
    if (stringGiven !== swedishWords[0][0]) {
      correctSpelling = false;
    } else {
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

    const swedishWordCharacters = swedishWords[0][0].split("");

    for (let i = 0; i < characters.length; i++) {
      if (characters[i] !== swedishWordCharacters[i]) {
        let correctIndex = swedishWordCharacters.indexOf(characters[i]);
        misaligned.push({
          character: characters[i],
          originalIndex: i,
          correctIndex,
        });
      }
    }

    /*     console.log(misaligned.map(({ character }) => character));
    console.log(misaligned.sort((a, b) => a.correctIndex - b.correctIndex)); */
    setMisaligned(misaligned);
    /*     return (misaligned.sort((a, b) => a.correctIndex - b.correctIndex)); */
  };
  useEffect(() => {
    calculateStats(userStats);
  }, [userStats.currentProgress]);

  const calculateStats = (userStats: {
    currentProgress: number;
    level: number;
    waterGain: number;
    levelReqXp: number;
    totalWords: number;
  }) => {
    let nextWaterGain: number;
    let nextLevelReqXp: number;

    if (userStats.currentProgress >= userStats.levelReqXp) {
      setTimeout(() => {
        setUserStats((prevState) => ({
          ...prevState,
          level: prevState.level + 1,
        }));
        nextWaterGain = Math.round((userStats.waterGain *= 2));
        nextLevelReqXp = Math.round((userStats.levelReqXp *= 2.2));

        setUserStats((prevState) => ({
          ...prevState,
          currentProgress: 0,
          waterGain: nextWaterGain,
          levelReqXp: nextLevelReqXp,
        }));
      }, 100);
    }

    setUserStats((prevState) => ({
      ...prevState,
      planted: Math.floor(userStats.totalWords / 24),
    }));

    if (userStats.totalWords >= swedishWordList.length) {
      setSwedishWordList([...SwedishWordList]);
      setEnglishWordList([...EnglishWordList]);
      setUserStats((prevState) => ({
        ...prevState,
        regrow: prevState.regrow + 1,
        totalWords: 0,
      }));
    }
  };

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
            <InputWord onSubmit={handleSubmit} correction={misaligned} />
          </div>

          <Upcoming englishwords={englishWordList} />
        </div>
        <div className={styles.credits}>
          <p> Made with love by Simon for my Star {"<"}3 </p>
        </div>
      </main>
    </>
  );
};

export default SweTree;
