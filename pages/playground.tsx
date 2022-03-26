import React, { useContext } from "react";
import PlaygroundComponent from "../components/Playground/Playground";
import Navbar from "../components/Navbar/Navbar";
import { UserContext } from "./_app";
import DashboardBtn from "../components/Elements/Buttons/DashboardBtn";
import LoginBtn from "../components/Elements/Buttons/LoginBtn";
import RegisterBtn from "../components/Elements/Buttons/RegisterBtn";

const Playground: React.FC = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <Navbar isCollapsible={false}>

        {user.isLoggedIn ? (
          <DashboardBtn />
        ) : (
          <>
            <LoginBtn />
            <RegisterBtn />
          </>
        )}
      </Navbar>
      <div className="pt-16">
        <PlaygroundComponent />
      </div>
    </>
  );
};
export default Playground;
