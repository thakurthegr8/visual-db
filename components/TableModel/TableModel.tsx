import React from 'react'
import { tableSchema } from '../../types/Table';
interface Props {
    tableData: tableSchema;
}
export const TableModel: React.FC<Props> = ({ tableData }) => {
    return (
        <div className="column-layout transition row-span-1 dark:bg-black bg-white dark:bg-opacity-40 shadow-md dark:shadow-xl rounded-b  rounded">
            <div className="rounded-t p-2 text-white font-semibold bg-opacity-30" style={{ backgroundColor: tableData.color }}>{tableData.name}</div>
            {
                tableData.columns.map((column, index) =>
                    <div key={index} className="p-2 flex justify-between font-semibold dark:text-white ">
                        <span>{column.name}</span>
                        <span>{column.dataType}</span>
                    </div>)
            }
        </div>
    )
}
export default TableModel;