import { NextApiRequest, NextApiResponse } from "next";
import { initializeApp } from "firebase/app";
import { collection, doc, getFirestore, onSnapshot } from "firebase/firestore";
import { databaseApiSchema } from "../../../types/Table";

const firebaseConfig = {
  apiKey: "AIzaSyBr_WrDvm6JMdWxUMHMzyw2E_UhOKf5XoQ",
  authDomain: "fir-app-be0ce.firebaseapp.com",
  projectId: "fir-app-be0ce",
  storageBucket: "fir-app-be0ce.appspot.com",
  messagingSenderId: "644006183610",
  appId: "1:644006183610:web:c3c7c4166c1ec736c67883",
};

const handler = (req: NextApiRequest, res: NextApiResponse<any>) => {
  const {id}  = req.query;
  const fApp = initializeApp(firebaseConfig);
  const db = getFirestore();
  const docRef = doc(db,"user-1-database",`${id}`);
  onSnapshot(docRef,(doc:any)=>{
    const {database,name} = doc.data();
    const docObj:databaseApiSchema = {
      database:JSON.parse(database),
      name:name,
      id:doc.id
    }
      res.status(200).json(docObj);
  })

};
export default handler;
