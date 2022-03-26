import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { UserContext } from "./_app";
import RegisterStyles from "../styles/Register.module.css";
import {
  devUrl,
  isDev,
  productionUrl,
} from "../default_objects/default_strings";
import InputField from "../components/InputField/InputField";
import Link from "next/link";
import Navbar from "../components/Navbar/Navbar";
import Head from "next/head";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userData, setUserData] = useState<any>(null);
  const { updateUser } = useContext(UserContext);
  const [signUpMessage, setSignUpMessage] = useState<{
    message: string;
    color: string;
  }>({ message: "", color: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    if (loading)
      fetch(isDev ? `${devUrl}/api/signup` : `${productionUrl}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => response.json())
        .then((body) => {
          setUserData(body);
        })
        .catch((err) => {
          setUserData(err);
        });
  }, [loading]);
  useEffect(() => {
    if (userData) {
      if (Object.keys(userData).includes("message")) {
        setSignUpMessage({
          color: "red",
          message: userData.message.code
        })
      } else {
        const { accessToken, expirationTime } = userData.user.stsTokenManager;
        const { uid } = userData.user;
        setSignUpMessage((signUpMessage) => ({
          ...signUpMessage,
          message: "Successfully Registered...",
          color: "#22c55e",
        }));
        document.cookie = `vdb_user=${accessToken}`;
        document.cookie = `vdb_uid=${uid}`;
        updateUser({
          uid,
          isLoggedIn: true
        });
        router.push(`/dashboard`);
      }
      setLoading(false);
    }
  }, [userData]);
  return (
    <>
      <Head><title>Visual-DB | Register</title></Head>
      <Navbar isCollapsible={true}></Navbar>
      <div className={RegisterStyles.main}>
        <div className={RegisterStyles.mainCard}>
          <h1 className={RegisterStyles.title}>
            Visual-DB
          </h1>
          <h1 className={RegisterStyles.brandTitle}>Register</h1>
          <form
            className={RegisterStyles.form}
            autoSave="true"
            onSubmit={(e) => {
              e.preventDefault();
              setLoading(true);
            }}
          >
            <InputField type="email" value={email} handler={setEmail} placeholder="Enter email..." />
            <InputField type="password" value={password} handler={setPassword} placeholder="Enter password..." />
            <button
              type="submit"
              disabled={loading}
              className={`btn ${RegisterStyles.signUpButton} ${loading ? "bg-green-600" : "bg-green-500"
                }`}
            >
              {loading ? (
                <span className="loader-rounded border-green-400"></span>
              ) : (
                "Signup"
              )}
            </button>
          </form>
          <Link href="/login">
            <button className={`btn ${RegisterStyles.loginButton}`}>
              Login
            </button>
          </Link>
          {signUpMessage.message.length > 0 && (
            <span style={{ color: signUpMessage.color }}>
              {signUpMessage.message}
            </span>
          )}
        </div>
      </div>
    </>
  );
};
export default Login;
