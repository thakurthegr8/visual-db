import { NextApiRequest, NextApiResponse } from "next";
import { initializeApp } from "firebase/app";
import {  getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseConfig from "../../../fr-api-auth.json";

const handler = (req: NextApiRequest, res: NextApiResponse<any>) => {
   const fApp = initializeApp(firebaseConfig) ;
  const auth = getAuth();
  const { email, password } = req.body;
  signInWithEmailAndPassword(auth, email,password)
    .then((cred) => {
      console.log("user created", cred.user);
      res.status(200).json({ user: cred.user });
    })
    .catch((err) => {
      console.log(email,password);
      res.status(200).json({ message: err });
    });
};
export default handler;
