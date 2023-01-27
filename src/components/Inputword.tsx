import React from "react";
import styles from "@/styles/Inputword.module.scss";

const InputWord = () => {
  return (
    <div className={styles.center}>
      <form action="" className={styles.form}>
        <input type="text" id="input" className={styles.inputword} />
      </form>
      <div>This is where text shows up when you answer!</div>
    </div>
  );
};

export default InputWord;
