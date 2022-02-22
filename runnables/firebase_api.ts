import { initializeApp } from "firebase/app";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseConfig from "../fr-api-auth.json";
import { databaseApiSchema, tableSchema } from "../types/Table";

const fApp = initializeApp(firebaseConfig);

export const getUserDataOnUID = (uid: string,setDB:(db:databaseApiSchema[])=>void) => {
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
      setDB(userData);
    } catch (err) {
      console.log(err);
    }
  });
};

export const signInWithEmlAndPwd = (
  email: string,
  password: string,
  setUserData: (user: any) => void
): any => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      setUserData({ user: cred.user });
    })
    .catch((err) => {
      setUserData({ message: err });
    });
};
