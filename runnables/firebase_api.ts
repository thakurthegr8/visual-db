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
  const qry = query(colRef, where("uid", "==", uid));
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

export const useSignInWithEmlAndPwd = (
  email: string,
  password: string
): any => {
  const auth = getAuth();
  const [userData, setUserData] = useState<any>({} as any);
  useEffect(() => {
    signInWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        setUserData({ user: cred.user });
      })
      .catch((err) => {
        setUserData({ message: err });
      });
  });
  return userData;
};

export const getDatabaseDataOnDbID = (
  id: string,
  setDatabase: (database: tableSchema[]) => void,
  setDbName: (dbName: string) => void,
  setDbId: (dbId: string) => void
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
      setDbName(docObj.name);
      setDbId(docObj.id);
    });
  } catch (e) {
    console.log(e);
  }
};
