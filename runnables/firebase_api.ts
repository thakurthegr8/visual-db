import { initializeApp } from "firebase/app";
import { useState, useEffect } from "react";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseConfig from "../fr-api-auth.json";
import { databaseApiSchema, tableSchema } from "../types/Table";
import {
  devUrl,
  isDev,
  productionUrl,
} from "../default_objects/default_strings";

const fApp = initializeApp(firebaseConfig);
const db = getFirestore();

export const getUserDataOnUID = async (uid: string) => {
  return new Promise((resolve, reject) => {
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
        resolve(userData);
      });
    } catch (err) {
      reject({ message: JSON.stringify });
    }
  });
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

export const getDatabaseDataOnDbID = async (
  id: string,
  setDatabase: (database: tableSchema[]) => void,
  setDbName: (dbName: string) => void,
  setDbId: (dbId: string) => void
) => {
  const docRef = await doc(db, "user-1-database", id);
  try {
   await onSnapshot(docRef, (doc: any) => {
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
export const addDatabase = async (uid: string) => {
  const fApp = initializeApp(firebaseConfig);
  const db = getFirestore();
  const colRef = collection(db, "user-1-database");
  try {
    const data = await addDoc(colRef, {
      database: "[]",
      name: "Unknown Database",
      uid,
    });
    if (data) {
      return { message: `${data.id} is successfully added` };
    }
  } catch (e) {
    return { message: `error in database creation` };
  }
};
export const saveDatabase = async (
  id: string,
  name: string,
  database: string
) => {
  const fApp = initializeApp(firebaseConfig);
  const docRef =  doc(db, "user-1-database", id);
  try {
    await updateDoc(docRef, {
      database: database,
      name: name,
    });
    return { message: `${name} successfully updated` };
  } catch (e) {
    return { message: `error in database updation` };
  }
};

export const deleteDatabase = async (id:string)=>{
  const docRef = doc(db,"user-1-database",id);
  try{
      await deleteDoc(docRef);
      return{message:`database with ${id} successfully deleted`};
  }catch(e){
      return {message:`error in database deletion`};
  }
}

