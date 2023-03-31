import { useCallback, useEffect } from "react";

interface UserStats {
  currentProgress: number;
  level: number;
  waterGain: number;
  levelReqXp: number;
  totalWords: number;
  regrow: number;
  planted: number;
}

const useCalculateStats = (
  userStats: UserStats,
  setUserStats: React.Dispatch<React.SetStateAction<UserStats>>,
  levelingUp: boolean,
  setLevelingUp: React.Dispatch<React.SetStateAction<boolean>>,
  englishWordListLength: number,
  swedishWordListLength: number,
  SwedishWordList: Array<Array<string>>,
  EnglishWordList: Array<Array<string>>
) => {
  const calculateStats = useCallback(() => {
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

    if (SwedishWordList.length === 0 && EnglishWordList.length === 0) {
      /*       setSwedishWordList([...SwedishWordList]);
      setEnglishWordList([...EnglishWordList]); */
      setUserStats((prevState) => ({
        ...prevState,
        regrow: prevState.regrow + 1,
        totalWords: 0,
      }));
    }
  }, [
    EnglishWordList,
    SwedishWordList,
    levelingUp,
    setLevelingUp,
    setUserStats,
    userStats,
  ]);

  useEffect(() => {
    calculateStats();
  }, [calculateStats]);
};

export default useCalculateStats;
