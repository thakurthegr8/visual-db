import React from "react";
import Link from "next/link";
import NavbarStyles from "./styles.module.css";


interface Props {
  children?: any;
  isCollapsible?: boolean;
}

const Navbar: React.FC<Props> = ({ children, isCollapsible }) => {
  return (
    <div className={NavbarStyles.main}>
      <div className={isCollapsible ? NavbarStyles.wrapper : NavbarStyles.wrapperCollapsible}>
        <Link href="/"><span className={NavbarStyles.logoText}>Visual-DB</span></Link>
        <div className="space-x-2">{children}</div>
      </div>
    </div>
  );
};
export default Navbar
