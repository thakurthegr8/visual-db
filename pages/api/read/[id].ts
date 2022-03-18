import { NextApiRequest, NextApiResponse } from "next";
import { initializeApp } from "firebase/app";
import { collection, doc, getFirestore, onSnapshot } from "firebase/firestore";
import { databaseApiSchema } from "../../../types/Table";
import firebaseConfig from "../../../fr-api-auth.json";

const handler = (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { id } = req.query;
  const fApp = initializeApp(firebaseConfig);
  const db = getFirestore();
  const docRef = doc(db, "user-1-database", `${id}`);
  try {
    onSnapshot(docRef, (doc: any) => {
      const { database, name } = doc.data();
      const docObj: databaseApiSchema = {
        database: JSON.parse(database),
        name: name,
        id: doc.id,
      };
      res.status(200).json(docObj);
    });
  } catch (e) {
    res.status(200).json({ message: "error" });
  }
};
export default handler;
