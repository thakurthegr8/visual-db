
import React from 'react'
import Link from 'next/link';
import Playground from '../components/Playground/Playground';
import { databaseApiSchema } from '../types/Table';
import Navbar from '../components/Navbar/Navbar';

const playground: React.FC = () => {
    return (
        <>
        <Navbar>
        <Link href="/dashboard">
            <button className="btn bg-fuchsia-500 text-white">Dashboard</button>
          </Link>
        </Navbar>
        <div className="pt-16">
            <Playground/>
        </div>
        </>
    )
}
export default playground;

