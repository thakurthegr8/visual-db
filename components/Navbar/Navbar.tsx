import React from "react";
import styles from "./styles.module.css";

export const Navbar: React.FC = () => {
  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
          <span className={styles.logoText}>Visual-DB</span>
      </div>
    </div>
  );
};
