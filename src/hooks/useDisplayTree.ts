import { useState, useEffect } from "react";

const useDisplayTree = (userStats: { totalWords: number }) => {
  const [treeDisplay, setTreeDisplay] = useState("");

  useEffect(() => {
    const treeSizes = ["tiny", "smol", "small", "medium", "large", "huge"];

    const index = Math.floor(userStats.totalWords / 5) % treeSizes.length;
    const treeDisplay = treeSizes[index];

    setTreeDisplay(treeDisplay);
  }, [userStats.totalWords]);

  return treeDisplay;
};

export default useDisplayTree;
