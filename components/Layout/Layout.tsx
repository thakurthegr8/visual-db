import React from "react";
import Footer from "../Footer/Footer";
import { Navbar } from "../Navbar/Navbar";
interface Props{
  children:any;
}
const Layout: React.FC<Props> = ({children}) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};
export default Layout;
