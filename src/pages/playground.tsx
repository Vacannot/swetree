import styles from "@/styles/Home.module.scss";
import Upcoming from "@/components/Upcoming";
import Stats from "@/components/Stats";
import DisplayWord from "@/components/Displayword";
import InputWord from "@/components/Inputword";
import EnglishWordList from "../../public/static/correctenglishwords.json";
import SwedishWordList from "../../public/static/correctswedishwords.json";
import { useEffect, useState } from "react";

const Playground = () => {
  const [englishWordList, setEnglishWordList] = useState(EnglishWordList);
  const [swedishWordList, setSwedishWordList] = useState(SwedishWordList);
  const [formValue, setFormValue] = useState("");

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

    const swedishWordCharacters = swedishWords[0][0].split("");
    console.log(swedishWordCharacters + " this is the answer");

    if (
      characters.length === 0 ||
      characters.length !== swedishWordCharacters.length
    ) {
      return console.log("there is no answer or it's incorrect length");
    }

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

    if (misaligned.length == 0) {
      removeTopWord();
    }

    return misaligned;

    /*     return (misaligned.sort((a, b) => a.correctIndex - b.correctIndex)); */
    /*     console.log(misaligned.map(({ character }) => character)); */
  };

  const removeTopWord = () => {
    let updatedEnglishWordList = [...englishWordList];
    updatedEnglishWordList.shift();
    setEnglishWordList(updatedEnglishWordList);

    let updatedSwedishWordList = [...swedishWordList];
    updatedSwedishWordList.shift();
    setSwedishWordList(updatedSwedishWordList);
  };

  return (
    <>
      <main className={styles.main}>
        <div className={styles.playground}>
          <Stats />
          <div className={styles.center}>
            <header className={styles.header}>
              Swe<span className={styles.green}>Tree</span>
              {/*               <button onClick={removeTopWord}>remove top word in list</button> */}
            </header>
            <DisplayWord topWord={englishWordList[0][0]} />
            <InputWord onSubmit={handleSubmit} correction={{ misaligned }} />
          </div>

          <Upcoming englishwords={englishWordList} />
        </div>
      </main>
    </>
  );
};

export default Playground;
