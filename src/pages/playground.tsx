import styles from "@/styles/Home.module.scss";
import Upcoming from "@/components/Upcoming";
import Stats from "@/components/Stats";
import DisplayWord from "@/components/Displayword";
import InputWord from "@/components/Inputword";
import EnglishWordList from "../../public/static/correctenglishwords.json";
import SwedishWordList from "../../public/static/correctswedishwords.json";
import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
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
  const [treeDisplay, setTreeDisplay] = useState("");
  const [levelingUp, setLevelingUp] = useState(false);

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

    //checks if the given answer is wrong, if it's not proceed move it doen the list and then proceed to the next word.
    if (stringGiven !== swedishWords[0][0]) {
      correctSpelling = false;

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

  const calculateStats = useCallback(
    (userStats: {
      currentProgress: number;
      level: number;
      waterGain: number;
      levelReqXp: number;
      totalWords: number;
    }) => {
      let nextWaterGain: number;
      let nextLevelReqXp: number;

      if (userStats.currentProgress >= userStats.levelReqXp && !levelingUp) {
        setLevelingUp(true);
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
          setLevelingUp(false);
        }, 100);
      }

      setUserStats((prevState) => ({
        ...prevState,
        planted: Math.floor(userStats.totalWords / 30),
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
    },
    [levelingUp, swedishWordList.length]
  );

  const calculateDisplayTree = (userStats: { totalWords: number }) => {
    const treeSizes = ["tiny", "smol", "small", "medium", "large", "huge"];

    const index = Math.floor(userStats.totalWords / 5) % treeSizes.length;
    const treeDisplay = treeSizes[index];

    setTreeDisplay(treeDisplay);
  };

  useEffect(() => {
    calculateStats(userStats);
    calculateDisplayTree(userStats);
  }, [calculateStats, userStats]);

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
        <div className={styles.treeDiv}>
          {treeDisplay === "huge" && (
            <Image
              id="HugeTree"
              src="/static/images/huge.png"
              alt="huge tree"
              width={48 * 3.1}
              height={87 * 3.1}
            />
          )}
          {treeDisplay === "large" && (
            <Image
              id="LargeTree"
              src="/static/images/large.png"
              alt="large tree"
              width={46 * 3}
              height={63 * 3}
            />
          )}
          {treeDisplay === "medium" && (
            <Image
              id="MediumTree"
              src="/static/images/medium.png"
              alt="medium tree"
              width={24 * 3}
              height={32 * 3}
            />
          )}
          {treeDisplay === "small" && (
            <Image
              id="SmallTree"
              src="/static/images/small.png"
              alt="small tree"
              width={16 * 3.5}
              height={19 * 3.5}
            />
          )}
          {treeDisplay === "smol" && (
            <Image
              id="SmolTree"
              src="/static/images/smol.png"
              alt="smol tree"
              width={16 * 3}
              height={13 * 3}
            />
          )}
          {treeDisplay === "tiny" && (
            <Image
              id="TinyTree"
              src="/static/images/tiny.png"
              alt="tiny tree"
              width={7 * 3}
              height={6 * 3}
            />
          )}
          {treeDisplay === "trunk" && (
            <Image
              id="TrunkTree"
              src="/static/images/trunk.png"
              alt="trunk tree"
              width={200 / 4}
              height={200 / 4}
            />
          )}
        </div>
        <div className={styles.credits}>
          <p> Made with love by Simon for my Star {"<"}3 </p>
        </div>
      </main>
    </>
  );
};

export default SweTree;