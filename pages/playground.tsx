import React, { useContext } from "react";
import Link from "next/link";
import PlaygroundComponent from "../components/Playground/Playground";
import { databaseApiSchema } from "../types/Table";
import Navbar from "../components/Navbar/Navbar";
import { UserContext } from "./_app";

const Playground: React.FC = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <Navbar>
        <Link href="/dashboard">
          {user.isLoggedIn ? (
            <Link href="/dashboard">
              <button className="btn bg-fuchsia-500 text-white">
                Dashboard
              </button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <button className="btn bg-pink-500 text-white">Login</button>
              </Link>
              <Link href="/register">
                <button className="btn bg-purple-500 text-white font-semibold">
                  Try Visual-db
                </button>
              </Link>
            </>
          )}
        </Link>
      </Navbar>
      <div className="pt-16">
        <PlaygroundComponent />
      </div>
    </>
  );
};
export default Playground;
