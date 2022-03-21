import { NextApiRequest,NextApiResponse } from "next";

const handler = (req:NextApiRequest, res:NextApiResponse<any>)=>{

    if(req.method === "POST"){
        const {name} = req.body;
        res.status(200).json({message:`hello, ${name}`});
    }else{
        res.status(300).json({message:`Method not allowed`});
    }
}
export default handler;