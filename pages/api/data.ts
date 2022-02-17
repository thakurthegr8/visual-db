import { NextApiRequest, NextApiResponse } from "next";
import { initializeApp } from "firebase/app";
import { collection, doc, getDocs, getFirestore } from "firebase/firestore";
import { databaseApiSchema, tableSchema } from "../../types/Table";
import firebaseConfig from "../../fr-api-auth.json";


const handler = (req: NextApiRequest, res: NextApiResponse<databaseApiSchema[] | {message:string}>) => {
  const fApp = initializeApp(firebaseConfig);
  const db = getFirestore();
  const colRef = collection(db, "user-1-database");
  getDocs(colRef)
    .then((snapshot) => {
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
    })
    .catch((e) => {
      res.status(500).send({message:"Error"});
    });
};
export default handler;
