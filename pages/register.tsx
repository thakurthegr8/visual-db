import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSignInWithEmlAndPwd } from "../runnables/firebase_api";
import {
  devUrl,
  isDev,
  productionUrl,
} from "../default_objects/default_strings";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userData, setUserData] = useState<any>(null);
  const [loginMessage, setLoginMessage] = useState<{
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
    if(userData){
      console.log(userData);
    }
  }, [userData]);
  return (
    <div className="flex sm:justify-center sm:items-center h-screen fixed inset-0 ">
      <div className="dark:text-white space-y-4 bg-white dark:bg-accent-gray shadow-xl sm:rounded sm:border sm:border-accent-gray-light sm:border-opacity-50 p-8 w-full sm:min-w-[20rem] sm:w-auto">
        <h1 className="text-sm  bg-green-500 p-1 rounded-full text-white font-semibold max-w-max">
          Register
        </h1>
        <h1 className="text-4xl font-extrabold">Visual-DB</h1>
        <form
          className="flex flex-col space-y-2"
          autoSave="true"
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
          }}
        >
          <input
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="p-2 font-semibold transition focus:ring-1 focus:ring-green-400 bg-white focus:outline-none bg-opacity-20 rounded shadow-md border border-accent-gray-light border-opacity-50"
            type="email"
            placeholder="Enter email..."
          />
          <input
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="p-2 font-semibold bg-white focus:ring-1 focus:ring-green-400 focus:outline-none bg-opacity-20 rounded shadow-md border border-accent-gray-light border-opacity-50"
            type="password"
            placeholder="Enter password..."
          />
          <button
            type="submit"
            disabled={loading}
            className={`btn flex justify-center items-center text-white ${
              loading ? "bg-green-600" : "bg-green-500"
            }`}
          >
            {loading ? (
              <span className="border-4 animate-spin block bg-transparent rounded-full border-green-400 border-t-white w-8 h-8"></span>
            ) : (
              "Signup"
            )}
          </button>
        </form>
        <button className="btn dark:bg-white bg-gray-200 text-black font-semibold w-full">
          Login
        </button>
        {loginMessage.message.length > 0 && (
          <span style={{ color: loginMessage.color }}>
            {loginMessage.message}
          </span>
        )}
      </div>
    </div>
  );
};
export default Login;
