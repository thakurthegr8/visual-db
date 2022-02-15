import React from "react";
import Link from "next/link";
import styles from "./styles.module.css";

export const Navbar: React.FC = () => {
  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <span className={styles.logoText}>Visual-DB</span>
        <ul><li><Link href="/dashboard">
          <button className="btn bg-purple-500 font-semibold">dashboard</button></Link></li></ul>
      </div>
    </div>
  );
};
