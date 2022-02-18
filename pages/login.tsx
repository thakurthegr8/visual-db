import React, { useState, useEffect } from 'react';
import {useRouter} from "next/router";
const signInUser = async (email: string, password: string, setUserData: (userData: any) => void) => {
    try {
        const res = await fetch(`http://localhost:3000/api/auth/signin?email=${email}&password=${password}`);
        const userData = await res.json();
        console.log(userData);
        setUserData(userData);
    } catch (err) {
        console.log(err);
        setUserData(err);
    }
}
const login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [userData, setUserData] = useState<any>(null);
    const [loginMessage, setLoginMessage] = useState<{ message: string; color: string }>({ message: "", color: "" });
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    useEffect(() => {
        if (userData) {
            if (Object.keys(userData).includes("message")) {
                const { code } = userData.message;
                if (code === "auth/wrong-password") {
                    setLoginMessage((loginMessage) => ({ ...loginMessage, message: "Wrong Password", color: "red" }));
                } else if (code === "auth/user-not-found") {
                    setLoginMessage((loginMessage) => ({ ...loginMessage, message: "Invalid User", color: "red" }));
                }
            } else {
                const { accessToken, expirationTime } = userData.user.stsTokenManager;
                const {uid} = userData.user;
                setLoginMessage((loginMessage) => ({ ...loginMessage, message: "Successfully logged in...", color: "#22c55e" }));
                document.cookie = `vdb_user=${accessToken}`;
                router.push(`/dashboard?uid=${uid}`);
            }
            setLoading(false);
        }
    }, [userData]);
    return (
        <div className="flex sm:justify-center sm:items-center h-screen fixed inset-0 ">
            <div className="dark:text-white space-y-4 bg-white dark:bg-accent-gray shadow-xl sm:rounded sm:border sm:border-accent-gray-light sm:border-opacity-50 p-8 w-full sm:min-w-[20rem] sm:w-auto">
                <h1 className="text-sm  bg-green-500 p-1 rounded-full text-white font-semibold max-w-max">Login</h1>
                <h1 className="text-4xl font-extrabold">Visual-DB</h1>
                <form className="flex flex-col space-y-2" autoSave="true" onSubmit={(e) => {
                    e.preventDefault();
                    setLoading(true);
                    signInUser(email, password, setUserData);
                }}>
                    <input required onChange={(e) => setEmail(e.target.value)} value={email} className="p-2 font-semibold transition focus:ring-1 focus:ring-green-400 bg-white focus:outline-none bg-opacity-20 rounded shadow-md border border-accent-gray-light border-opacity-50" type="email" placeholder="Enter email..." />
                    <input required onChange={(e) => setPassword(e.target.value)} value={password} className="p-2 font-semibold bg-white focus:ring-1 focus:ring-green-400 focus:outline-none bg-opacity-20 rounded shadow-md border border-accent-gray-light border-opacity-50" type="password" placeholder="Enter password..." />
                    <button type="submit" disabled={loading} className={`btn flex justify-center items-center text-white ${loading ? "bg-green-600" : "bg-green-500"}`}>{loading ? <span className="border-4 animate-spin block bg-transparent rounded-full border-green-400 border-t-white w-8 h-8"></span> : "Login"}</button>
                </form>
                <button className="btn dark:bg-white bg-gray-200 text-black font-semibold w-full">Sign Up</button>
                {loginMessage.message.length > 0 && <span style={{ color: loginMessage.color }}>{loginMessage.message}</span>}
            </div>
        </div>
    )
}
export default login;
