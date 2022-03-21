import { NextApiRequest, NextApiResponse } from "next";
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth
} from "firebase/auth";
import firebaseConfig from "../../fr-api-auth.json";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const fApp = initializeApp(firebaseConfig);
  const auth = getAuth();
  const db = getFirestore();
  const { email, password } = req.body;
  try {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    if (data) {
      const colRef = collection(db, "users");
      const userData = await addDoc(colRef, {
        uid: data.user.uid,
        name: "",
        email: data.user.email,
      });
      if (userData) res.status(201).json({ user: data.user });
    }
  } catch (err) {
    res.status(300).json({ message: err });
  }
};
export default handler;
