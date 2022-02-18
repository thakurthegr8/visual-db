import { NextApiRequest, NextApiResponse } from "next";
import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { databaseApiSchema, tableSchema } from "../../../types/Table";
import firebaseConfig from "../../../fr-api-auth.json";

const handler = (
  req: NextApiRequest,
  res: NextApiResponse<databaseApiSchema[] | { message: string }>
) => {
  const { uid } = req.query;
  const fApp = initializeApp(firebaseConfig);
  const db = getFirestore();
  const colRef = collection(db, "user-1-database");
  const qry = query(colRef, where("uid", "==", uid));
  onSnapshot(qry, (snapshot) => {
    try {
      const userData = snapshot.docs.map((doc) => {
        const { database, name } = doc.data();
        const databaseObject = JSON.parse(database);
        return {
          database: databaseObject,
          name: name,
          id: doc.id,
        };
      });
      res.status(200).json(userData);
    } catch (err) {
      res.status(200).json({ message: JSON.stringify(err) });
    }
  });
};
export default handler;
