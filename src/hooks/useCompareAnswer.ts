type WordList = Array<Array<string>>;

interface UserStats {
  currentProgress: number;
  level: number;
  levelReqXp: number;
  waterGain: number;
  totalWords: number;
  planted: number;
  regrow: number;
}

interface UseCompareAnswersProps {
  englishWordList: WordList;
  setEnglishWordList: React.Dispatch<React.SetStateAction<WordList>>;
  swedishWordList: WordList;
  setSwedishWordList: React.Dispatch<React.SetStateAction<WordList>>;
  setUserStats: React.Dispatch<React.SetStateAction<UserStats>>;
  setShowCorrect: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setPreviousWord: React.Dispatch<React.SetStateAction<string>>;
}

const useCompareAnswers = ({
  englishWordList,
  setEnglishWordList,
  swedishWordList,
  setSwedishWordList,
  setUserStats,
  setShowCorrect,
  setPreviousWord,
}: UseCompareAnswersProps) => {
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
      setUserStats(
        // typescript fel, ingen aning hur man fixar
        // @ts-ignore
        (prevState: {
          totalWords: number;
          currentProgress: number;
          waterGain: number;
        }) => ({
          ...prevState,
          totalWords: prevState.totalWords + 1,
          currentProgress: prevState.currentProgress + 1 * prevState.waterGain,
        })
      );

      let updatedEnglishWordList = [...englishWordList];
      updatedEnglishWordList.shift();
      setEnglishWordList(updatedEnglishWordList);

      let updatedSwedishWordList = [...swedishWordList];
      updatedSwedishWordList.shift();
      setSwedishWordList(updatedSwedishWordList);
    }
  };

  return { compareAnswer, setShowCorrect };
};

export default useCompareAnswers;
