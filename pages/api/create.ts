import { NextApiRequest, NextApiResponse } from "next";
import { initializeApp } from "firebase/app";
import {
  doc,
  getFirestore,
  onSnapshot,
  addDoc,
  collection,
} from "firebase/firestore";
import firebaseConfig from "../../fr-api-auth.json";
import { ApiResponseMessage } from "../../types/Table";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponseMessage>
) => {
  if (req.method === "POST") {
    const fApp = initializeApp(firebaseConfig);
    const db = getFirestore();
    const colRef = collection(db, "user-1-database");
    const { uid } = req.body;
    try {
      const data = await addDoc(colRef, {
        database: "[]",
        name: "Unknown Database",
        uid
      });
      if (data) {
        res.status(201).json({ message: `${data.id} is successfully added` });
      }
    } catch (e) {
      res.status(400).json({ message: `error in database creation` });
    }
  } else {
    res.status(300).json({ message: "Method not allowed" });
  }
};
export default handler;
