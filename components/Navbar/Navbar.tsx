import React from "react";
import Link from "next/link";
import NavbarStyles from "./styles.module.css";


interface Props{
  children?:any;
}

 const Navbar: React.FC<Props> = ({children}) => {
  return (
    <div className={NavbarStyles.main}>
      <div className={NavbarStyles.wrapper}>
        <Link href="/"><span className={NavbarStyles.logoText}>Visual-DB</span></Link>
        <div className="space-x-2">{children}</div>
      </div>
    </div>
  );
};
export default Navbar
