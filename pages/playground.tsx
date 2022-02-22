
import React from 'react'
import Link from 'next/link';
import Playground from '../components/Playground/Playground';
import { GetServerSideProps } from 'next';
import { databaseApiSchema } from '../types/Table';
import Navbar from '../components/Navbar/Navbar';
interface Props {
    data: databaseApiSchema ;
}
const playground: React.FC<Props> = ({ data }) => {
    return (
        <>
        <Navbar>
        <Link href="/dashboard">
            <button className="btn bg-fuchsia-500 text-white">Dashboard</button>
          </Link>
        </Navbar>
        <div className="pt-16">
            <Playground data={data} demo={data == undefined ? true:false}/>
        </div>
        </>
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
