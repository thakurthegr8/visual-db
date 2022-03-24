import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { UserContext } from "./_app";
import Navbar from "../components/Navbar/Navbar";
import InputField from "../components/InputField/InputField";
import LoginStyles from "../styles/Login.module.css";
import { loginUser } from "../runnables/firebase_api";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userData, setUserData] = useState<any>(null);
  const { updateUser } = useContext(UserContext);
  const [loginMessage, setLoginMessage] = useState<{
    message: string;
    color: string;
  }>({ message: "", color: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      const data = await loginUser(email, password);
      if (data) {
        setUserData(data);
      }
    }
    if (loading) {
      fetchData();
    }
  }, [loading]);
  useEffect(() => {
    if (userData) {
      if (Object.keys(userData).includes("message")) {
        const { code } = userData.message;
        if (code === "auth/wrong-password") {
          setLoginMessage((loginMessage) => ({
            ...loginMessage,
            message: "Wrong Password",
            color: "red",
          }));
        } else if (code === "auth/user-not-found") {
          setLoginMessage((loginMessage) => ({
            ...loginMessage,
            message: "Invalid User",
            color: "red",
          }));
        }
      } else {
        const { accessToken, expirationTime } = userData.user.stsTokenManager;
        const { uid } = userData.user;
        setLoginMessage((loginMessage) => ({
          ...loginMessage,
          message: "Successfully logged in...",
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
      <Head>
        <title>Visual-DB | Login</title>
      </Head>
      <Navbar>

      </Navbar>
      <main className={LoginStyles.main}>
        <div className={LoginStyles.mainCard}>
          <h1 className={LoginStyles.title}>
            Visual-DB
          </h1>
          <h1 className={LoginStyles.brandTitle}>Login</h1>
          <form
            className={LoginStyles.form}
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
              className={`btn ${LoginStyles.loginButton} ${loading ? "bg-green-600" : "bg-green-500"
                }`}
            >
              {loading ? (
                <span className="loader-rounded border-green-400"></span>
              ) : (
                "Login"
              )}
            </button>
          </form>
          <Link href="/register">
            <button className={`btn ${LoginStyles.signUpButton}`}>
              Sign Up
            </button>
          </Link>
          {loginMessage.message.length > 0 && (
            <span style={{ color: loginMessage.color }}>
              {loginMessage.message}
            </span>
          )}
        </div>
      </main>
    </>
  );
};
export default Login;
