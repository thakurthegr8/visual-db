import { NextApiRequest, NextApiResponse } from "next";
import { initializeApp } from "firebase/app";
import { doc, getFirestore, addDoc, updateDoc } from "firebase/firestore";
import firebaseConfig from "../../fr-api-auth.json";
import { ApiResponseMessage, databaseApiSchema } from "../../types/Table";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponseMessage>
) => {
  const fApp = initializeApp(firebaseConfig);
  const db = getFirestore();
  const { id, name, database } = req.body;
  const docRef = doc(db, "user-1-database", id.toString());
  try {
    await updateDoc(docRef, {
      database: database,
      name: name,
    });
    console.log("done");
    return res.json({ message: `${name} successfully updated` });
  } catch (e) {
    return res.json({ message: `error in database updation` });
  }
};
export default handler;
