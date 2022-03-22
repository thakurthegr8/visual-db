import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { initializeApp } from "firebase/app";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { databaseApiSchema } from "../../../types/Table";
import firebaseConfig from "../../../fr-api-auth.json";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<databaseApiSchema[] | { message: string }>
) => {
  return new Promise((resolve, reject) => {
    if (req.method === "POST") {
      const { uid } = req.body;
      const fApp = initializeApp(firebaseConfig);
      const db = getFirestore();
      const colRef = collection(db, "user-1-database");
      const qry = query(colRef, where("uid", "==", uid));
      try {
        onSnapshot(qry, (snapshot) => {
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
          resolve();
        });
      } catch (err) {
        res.status(400).json({ message: JSON.stringify(err) });
        reject();
      }
    }
  });
};
export default handler;
