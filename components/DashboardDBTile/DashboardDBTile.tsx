import React, { useState } from 'react'
import Link from "next/link";
import { Pencil, Trash } from '../../elements/Icons/Icons';
import { deleteDatabase, saveDatabase } from '../../runnables/common_runnables';
import { tableSchema } from '../../types/Table';

interface Props {
    id: string;
    name: string;
    database: tableSchema[];
    loading: boolean;
    setLoading: (loading: boolean) => void;
    refreshPage: () => void
}
const DashboardDBTile: React.FC<Props> = ({ id, name, database, loading, setLoading, refreshPage }) => {
    const [isEditMode, setEditMode] = useState<boolean>(false);
    const [dbName, setDbName] = useState<string>("");
    return (
        <div
            className="dark:text-white flex flex-col space-y-2 cursor-pointer  hover:bg-white hover:bg-opacity-10 border transition-all border-opacity-50 border-accent-gray-light rounded-xl p-4"
        >
            <div className="flex justify-end">
                <button
                    onClick={() => setEditMode(!isEditMode)}
                    className="btn shadow-none hover:bg-black hover:bg-opacity-10 active:bg-opacity-25 text-inherit"
                >
                    {loading ? <span className="border-4 animate-spin block bg-transparent rounded-full border-rose-400 border-t-white w-8 h-8"></span> : <Pencil />}
                </button>
                <button
                    onClick={() => { deleteDatabase(id); refreshPage(); }}
                    className="btn shadow-none text-red-600 hover:bg-black hover:bg-opacity-10 active:bg-opacity-25 text-inherit"
                >
                    {loading ? <span className="border-4 animate-spin block bg-transparent rounded-full border-rose-400 border-t-white w-8 h-8"></span> : <Trash />}
                </button>
            </div>{
                isEditMode ? <form onSubmit={(e) => {
                    e.preventDefault();
                    setEditMode(false);
                    saveDatabase(id, dbName, JSON.stringify(database));
                    refreshPage();
                }} className="flex flex-col">
                    <input onChange={e => setDbName(e.target.value)} type="text" value={dbName} placeholder={`previous name : ${name}`} className="bg-accent-gray-light p-2 rounded focus:outline-none" />
                </form> :
                    <Link href={`/playground?db_id=${id}`}>
                        <span>{name}</span>
                    </Link>
            }
        </div >
    )
}
export default DashboardDBTile;