import React, { useState, useEffect } from 'react'
import { Actions } from '../../elements/Icons/Icons';
import { tableSchema } from '../../types/Table';
import DialogBox from '../DialogBox/DialogBox';
import { Dialog } from '@headlessui/react';
import { colorGenerator } from '../../generators/generators_color';
interface Props {
    tableData: tableSchema;
}
type KeyValueField = {
    field: string;
    value: string;
};
export const TableModel: React.FC<Props> = ({ tableData }) => {
    const [columnValueFields, setColumnValueFields] = useState<KeyValueField[]>([]);
    const createTableQuery = () => {
        // useEffect(() => {
        //     const columnValues = tableData.columns.map(column => {
        //         return {
        //             field: column.name,
        //             value: ""
        //         }
        //     })
        //     setColumnValueFields(columnValues);
        // });
        const queryStart = `create table ${tableData.name}(\n`;
        const columnStrings = tableData.columns.map(column => {
            return `
            ${column.name} ${column.dataType} ${column.keyType !== "none" ? column.keyType : ""} 
            ${column.nullable ? "null" : ""} ${column.autoIncrement ? "auto_increment" : ""}
            `;
        })
        const queryMid = columnStrings.join(",");
        const queryEnd = `);`;
        return `${queryStart} ${queryMid} ${queryEnd}`;
    }

    const insertIntoTable = () => {
        const queryStart = `insert into ${tableData.name}(`;
        const columnKeys = (tableData.columns.map(column => column.name)).join(",");
        return `${queryStart} ${columnKeys}) values (`;
    }
    const updateColumnValue = (eName: string, eValue: string) => {
        const updatedColumnFieldValues = columnValueFields.map(column => {
            if (eName === column.field) {
                return {
                    ...column,
                    value: eValue
                }
            }
            return column;
        });
        setColumnValueFields(updatedColumnFieldValues);
    }
    const [isDialogOpen, setDialogOpen] = useState(false);
    return (
        <div className="column-layout transition row-span-1 dark:bg-black bg-white dark:bg-opacity-40 shadow-md dark:shadow-xl rounded-b rounded">
            <div className="rounded-t p-2 text-white font-semibold bg-opacity-30 flex justify-between items-center" style={{...colorGenerator(tableData.color),borderTop:"4px solid"}}>
                <span>{tableData.name}</span>
                <button onClick={() => setDialogOpen(true)} className="btn shadow-none hover:bg-black hover:bg-opacity-10 active:bg-opacity-25 text-inherit"><Actions /></button>
                <DialogBox isDialogOpen={isDialogOpen} setDialogOpen={setDialogOpen} >
                    <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900  dark:text-white"
                    >
                        Table Queries
                    </Dialog.Title>
                    <div className="flex flex-col space-y-2">
                        <h1>Create Table</h1>
                        <div className="bg-black rounded text-white p-2 text-monospace">
                            <span>{createTableQuery()}</span>
                        </div>
                        <h1>Table insertion</h1>
                        <div className="bg-black rounded p-2 text-white text-monospace gap-4 flex flex-col">
                            <span>{insertIntoTable()}</span>
                            {/* {
                                columnValueFields.map((columnField, index) =>
                                    <div key={index} className="gap-4 flex">
                                        <input type="text"
                                            name={columnField.field}
                                            onChange={(e) => updateColumnValue(e.target.name, e.target.value)}
                                            placeholder={columnField.field}
                                            className="bg-accent-gray text-sm p-1 rounded"
                                            value={columnField.value} />
                                        {index !== columnValueFields.length - 1 && <span>,</span>}
                                    </div>)
                            } */}
                            <span>{`);`}</span>
                        </div>
                    </div>
                </DialogBox>
            </div>
            {
                tableData.columns.map((column, index) =>
                    <div key={index} className="p-2 flex justify-between font-semibold dark:text-white text-xs space-x-1 ">
                        <span className="bg-accent-gray-light bg-opacity-20 p-1 rounded">{column.name}</span>
                        <div className="flex items-center gap-1 justify-evenly flex-wrap text-white">
                            {column.dataType.length !== 0 && <span className="bg-blue-600 p-1 rounded">{column.dataType}</span>}
                            {column.keyType !== "none" && <span className="bg-violet-600 p-1 rounded">{column.keyType}</span>}
                            {column.nullable && <span className="bg-green-600 p-1 rounded">null</span>}
                            {column.autoIncrement && <span className="bg-red-600 p-1 rounded">auto increment</span>}
                            {column.unsigned && <span className="bg-pink-600 p-1 rounded">unsigned</span>}
                        </div>
                    </div>)
            }
        </div>
    )
}
export default TableModel;