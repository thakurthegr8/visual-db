import React from "react";
import Link from "next/link";
import styles from "./styles.module.css";


interface Props{
  children?:any;
}

 const Navbar: React.FC<Props> = ({children}) => {
  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <Link href="/"><span className={styles.logoText}>Visual-DB</span></Link>
        <div className="space-x-2">{children}</div>
      </div>
    </div>
  );
};
export default Navbar
