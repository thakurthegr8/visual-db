import { initializeApp } from "firebase/app";
import { useState, useEffect } from "react";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
  doc,
} from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseConfig from "../fr-api-auth.json";
import { databaseApiSchema, tableSchema } from "../types/Table";

const fApp = initializeApp(firebaseConfig);

export const useUserDataOnUID = (uid: string) => {
  const [userData, setUserData] = useState<databaseApiSchema[]>(
    [] as databaseApiSchema[]
  );
  const db = getFirestore();
  const colRef = collection(db, "user-1-database");
  const qry = query(colRef, where("uid", "==", "dyeZSoVYAKNQukpir7mAKOCaoKl2"));
  useEffect(() => {
    onSnapshot(qry, (snapshot) => {
      const tempUserData = snapshot.docs.map((doc) => {
        const { database, name } = doc.data();
        const databaseObject = JSON.parse(database);
        return {
          database: databaseObject,
          name: name,
          id: doc.id,
        };
      });
      setUserData(tempUserData);
    });
  });
  return userData;
};

export const useSignInWithEmlAndPwd = (email:string, password:string,setUserData:(userData:any)=>void) => {
  const [tempUserData, setTempUserData] = useState(null as any);
  if (email.length > 0 && password.length > 0) {
    const auth = getAuth();
    useEffect(() => {
        if (!tempUserData) {
        signInWithEmailAndPassword(auth, email, password)
          .then((cred) => {
            setTempUserData({ user: cred.user });
          })
          .catch((err) => {
            setTempUserData({ message: err });
          });
        }
      });
      setUserData(tempUserData);
  }
};

export const getDatabaseDataOnDbID = (
  id: string,
  setDatabase: (database: tableSchema[]) => void
) => {
  const fApp = initializeApp(firebaseConfig);
  const db = getFirestore();
  const docRef = doc(db, "user-1-database", id);
  try {
    onSnapshot(docRef, (doc: any) => {
      const { database, name } = doc.data();
      const docObj: databaseApiSchema = {
        database: JSON.parse(database),
        name: name,
        id: doc.id,
      };
      setDatabase(docObj.database);
    });
  } catch (e) {
    console.log(e);
  }
};
