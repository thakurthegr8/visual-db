import { NextApiRequest, NextApiResponse } from "next";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseConfig from "../../../fr-api-auth.json";

const handler = (req: NextApiRequest, res: NextApiResponse<any>) => {
   const fApp = initializeApp(firebaseConfig) ;
  const auth = getAuth();
  const { email, password } = req.query;
  signInWithEmailAndPassword(auth, `${email}`, `${password}`)
    .then((cred) => {
      console.log("user created", cred.user);
      res.status(200).json({ user: cred.user });
    })
    .catch((err) => {
      res.status(200).json({ message: err });
      console.log(err);
    });
};
export default handler;
