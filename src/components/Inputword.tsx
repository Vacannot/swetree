import React from "react";
import styles from "@/styles/Inputword.module.scss";
import { useState } from "react";

interface MyFormProps {
  onSubmit: (value: string) => void;
  correction: {
    character: string;
    originalIndex: number;
    correctIndex: number;
  }[];
}

const InputWord: React.FC<MyFormProps> = ({ onSubmit, correction }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    onSubmit(inputValue);
    setInputValue("");
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
      <div>
        {correction.map((item) => (
          <>
            <span className={styles.misaligned}>
              {item.character}
              {item.correctIndex}
              {item.originalIndex}
            </span>
          </>

          // do expected word and actual word istead of compare
        ))}
      </div>
    </div>
  );
};

export default InputWord;
