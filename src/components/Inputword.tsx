import React from "react";
import styles from "@/styles/Inputword.module.scss";
import { useState } from "react";

interface MyFormProps {
  onSubmit: (value: string) => void;
  correctSpelling: string;
  showCorrect: boolean | undefined;
}

const InputWord: React.FC<MyFormProps> = ({
  onSubmit,
  correctSpelling,
  showCorrect,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [hasSubmittedOnce, setHasSubmittedOnce] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    onSubmit(inputValue);
    setInputValue("");
    setHasSubmittedOnce(true);
  };

  return (
    <div className={styles.center}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          id="input"
          className={styles.inputword}
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
      </form>
      {showCorrect ? (
        <div className={styles.inlineContainer}>
          The correct spelling was:&nbsp;
          <p className={styles.redText}>{correctSpelling}</p>
        </div>
      ) : (
        hasSubmittedOnce && <div className={styles.greenText}> Goodjob!</div>
      )}
    </div>
  );
};

export default InputWord;
