import React from "react";
import styles from "./styles.module.css";

export const Navbar: React.FC = () => {
  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <span className={styles.logoText}>Visual-DB</span>
        <ul><li><button className="btn bg-purple-500 font-semibold">Try Visual-DB</button></li></ul>
      </div>
    </div>
  );
};
