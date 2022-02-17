
import React from 'react'
import Playground from '../components/Playground/Playground';
import { GetServerSideProps } from 'next';
import { databaseApiSchema } from '../types/Table';
interface Props {
    data: databaseApiSchema ;
}
const playground: React.FC<Props> = ({ data }) => {
    return (
        <div className="pt-14">
            <Playground data={data} demo={data == undefined ? true:false}/>
        </div>
    )
}
export default playground;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { db_id } = context.query;
    if (db_id) {
        const response = await fetch(`http://localhost:3000/api/read/${db_id}`);
        const data = await response.json();
        return {
            props: {
                data
            }
        }
    }
    return{
        props:{
            data:null
        }
    } 
}
