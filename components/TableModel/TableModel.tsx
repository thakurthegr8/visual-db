import React, { useState } from 'react'
import { Actions } from '../../elements/Icons/Icons';
import { tableSchema } from '../../types/Table';
import DialogBox from '../DialogBox/DialogBox';
interface Props {
    tableData: tableSchema;
}
export const TableModel: React.FC<Props> = ({ tableData }) => {
    const createTableQuery = () => {
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
    const [isDialogOpen, setDialogOpen] = useState(false);
    return (
        <div className="column-layout transition row-span-1 dark:bg-black bg-white dark:bg-opacity-40 shadow-md dark:shadow-xl rounded-b rounded">
            <div className="rounded-t p-2 text-white font-semibold bg-opacity-30 flex justify-between items-center" style={{ backgroundColor: tableData.color }}>
                <span >{tableData.name}</span>
                <button onClick={() => setDialogOpen(true)} className="btn shadow-none hover:bg-black hover:bg-opacity-10 active:bg-opacity-25 text-inherit"><Actions /></button>
                <DialogBox isDialogOpen={isDialogOpen} createTableQuery={createTableQuery} setDialogOpen={setDialogOpen} />
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