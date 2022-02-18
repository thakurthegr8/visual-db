import React, { useState } from 'react'
import { GetServerSideProps, GetStaticProps } from 'next';
import Link from "next/link";
import { databaseApiSchema, tableSchema } from '../types/Table';
import Navbar from '../components/Navbar/Navbar';
import DropDown from '../components/DropDown/DropDown';
import { ColorSwatch } from '../elements/Icons/Icons';
import { colors } from '../default_objects/table_defaults';
import { Menu } from '@headlessui/react';
interface Props {
    databases: databaseApiSchema[]
}
const dashboard: React.FC<Props> = ({ databases = [] }) => {
    const [db, setDB] = useState<databaseApiSchema[]>(databases ? databases : []);
    return (
        <>
            <Navbar>
                <DropDown alignment="bottom" title="Table Colors" mainIcon={ColorSwatch}>
                    <div className="grid grid-cols-4 gap-2">{colors.map((item, index) => <Menu.Item as="button" key={index}>{item}</Menu.Item>)}</div>
                </DropDown>
            </Navbar>
            <section className="flex flex-col">
                <div className="text-white text-3xl  lg:text-5xl px-4 font-bold pt-24 pb-24 bg-gradient-to-br from-indigo-600 dark:to-black to-white"><h1 className="mx-auto container">Your Diagrams</h1></div>
                <div className="flex flex-col mx-auto container px-2 lg:px-0 space-y-4 ">
                    <div className="bg-white -mt-16 dark:bg-accent-gray flex flex-col space-y-4 px-4 py-8 rounded-xl border-opacity-50 shadow-md  dark:border border-accent-gray-light">
                        <div>
                            <Link href="/playground"><button className="btn bg-rose-500 text-white text-base font-semibold float-right">New Diagram</button></Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {
                                db.length > 0 && db.map(database => <Link key={database.id} href={`/playground?db_id=${database.id}`}>
                                    <div className="dark:text-white cursor-pointer active:scale-90 hover:bg-white hover:bg-opacity-10 border transition-all border-opacity-50 border-accent-gray-light rounded-xl p-4">{database.name}</div>
                                </Link>)
                            }

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default dashboard;


export const getServerSideProps: GetServerSideProps = async (context) => {
    const { uid } = context.query;
    // const response = await fetch(`http://localhost:3000/api/data/${uid}`);
    const databases: databaseApiSchema[] = [];
    return {
        props: {
            databases
        }
    }
}