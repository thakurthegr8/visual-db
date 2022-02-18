import {NextApiRequest, NextApiResponse} from "next";
import {initializeApp} from "firebase/app";
import {doc,getFirestore,onSnapshot,addDoc,collection} from "firebase/firestore";
import firebaseConfig from "../../fr-api-auth.json";
import {ApiResponseMessage} from "../../types/Table";



const handler = (req:NextApiRequest, res:NextApiResponse<ApiResponseMessage>)=>{
    const fApp = initializeApp(firebaseConfig);
    const db = getFirestore();
    const colRef = collection(db,"user-1-database");
    const {name,database} = req.query;
    try{
        addDoc(colRef,{
            database,name
        });
        res.json({message:`${name} successfully added`});
    }catch(e){
        res.json({message:`error in database creation`});
    }
}
export default handler;