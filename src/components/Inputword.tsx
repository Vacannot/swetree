import React from "react";
import styles from "@/styles/Inputword.module.scss";
import { useState } from "react";

interface MyFormProps {
  onSubmit: (value: string) => void;
  correction: Array<string>;
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
        {" "}
        {correction.map((word, index) => (
          <div key={index}>{word}</div>
        ))}
      </div>
    </div>
  );
};

export default InputWord;
