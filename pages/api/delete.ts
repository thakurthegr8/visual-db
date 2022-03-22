import {NextApiRequest, NextApiResponse} from "next";
import {initializeApp} from "firebase/app";
import {doc,getFirestore,onSnapshot,addDoc,collection, deleteDoc} from "firebase/firestore";
import firebaseConfig from "../../fr-api-auth.json";
import {ApiResponseMessage} from "../../types/Table";

const handler = async (req:NextApiRequest, res:NextApiResponse<ApiResponseMessage>)=>{
    const fApp = initializeApp(firebaseConfig);
    const db = getFirestore();
    const {id} = req.body;
    const docRef = doc(db,"user-1-database",id);
    try{
        await deleteDoc(docRef);
        return res.json({message:`database with ${id} successfully deleted`});
    }catch(e){
        return res.json({message:`error in database deletion`});
    }
}
export default handler;