import "../styles/globals.css";
import { useEffect,useState } from "react";
import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";
import React, { createContext } from "react";
import { userSetterPair, userType } from "../types/User";
import { generateCookies } from "../generators/generators_cookies";
export const UserContext = createContext<userSetterPair>({} as userSetterPair);
function MyApp({ Component, pageProps }: AppProps) {
  const [user, updateUser] = useState<userType>({uid:"",isLoggedIn:false});
  useEffect(() => {
    try{
      const cookies:any = generateCookies(document.cookie);
      if(cookies.vdb_uid && cookies.vdb_user){
        updateUser({
          uid:cookies.vdb_uid,
          isLoggedIn:true
        });
      }
    }catch(err){
      console.log("Not logged in");
    }
  }, []);
  return (
    <UserContext.Provider value={{user,updateUser}}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </UserContext.Provider>
  );
}

export default MyApp;
