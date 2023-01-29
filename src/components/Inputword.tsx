import React from "react";
import styles from "@/styles/Inputword.module.scss";
import { useState } from "react";

interface MyFormProps {
  onSubmit: (value: string) => void;
}

const InputWord: React.FC<MyFormProps> = ({ onSubmit }) => {
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
      <div>This is where text shows up when you answer!</div>
    </div>
  );
};

export default InputWord;
