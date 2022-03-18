import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { NextApiRequest, NextApiResponse } from "next";
import firebaseConfig from "../../fr-api-auth.json";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  let userData:any;
  const {email,password} = req.body;
  signInWithEmailAndPassword(auth,email,password)
  .then(cred=>{
      res.status(200).json({user:cred.user});
  }).catch(err=>{
    res.status(300).json({message:err});
  });
//   res.status(500).json({ message:"invalid response" });
};
export default handler;
