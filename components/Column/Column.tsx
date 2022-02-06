import React, { memo, useContext, useState } from 'react';
import { tableSchema, tableSetterPair } from '../../types/Table';
import { Actions, Key } from '../../elements/Icons/Icons';
import { columnSchema } from '../../types/Table';
import { CustomListBox } from '../CustomListBox/CustomListBox';
import { DatabaseContext } from '../Playground/Playground';
import { getUpdatedTables } from "../../runnables/tablesIterator";
import { TableContext } from '../TableEditor/TableEditor';
interface Props {
    item: columnSchema;
}

const Column: React.FC<Props> = ({ item }) => {
    const { name, id, nullable, dataType } = item;
    const { database, updateDatabase } = useContext<tableSetterPair>(DatabaseContext);
    const tableId = useContext<number>(TableContext);
    const changeColumnName = (value: string) => {
        const updatedTables: tableSchema[] = getUpdatedTables(database, tableId, id, value, "name");
        updateDatabase(updatedTables);
    }
    const updateNullable = () => {
        const updatedTables: tableSchema[] = getUpdatedTables(database, tableId, id, "any", "nullable");
        updateDatabase(updatedTables);
        console.log(tableId, id);
        console.log(nullable);
    }
    return (<div className="p-2 hover:bg-gray-100 space-x-4 flex items-center justify-around">
        <input
            type="text"
            placeholder={name}
            value={name}
            onChange={e => changeColumnName(e.target.value)}
            className=" max-w-[4rem] p-1 rounded outline-none focus:ring-2 focus:ring-offset-blue-600"
        />
        <CustomListBox columnId={id} dataType={dataType} />
        <label htmlFor={`table_${tableId}_column_${id}`} className={`${nullable ? "text-white bg-blue-500 rounded-full hover:bg-blue-600" : "text-black"} font-semibold p-2 rounded flex justify-center items-center  text-center shadow-none  hover:bg-gray-200`} title="Nullable!">N</label>
        <input className="hidden" type="checkbox" checked={nullable} id={`table_${tableId}_column_${id}`} name={`table_${tableId}_column_${id}`} onChange={() => { updateNullable() }} />
        <button className="btn shadow-none hover:bg-gray-200 text-gray-600"><Key /></button>
        <button className="btn shadow-none hover:bg-gray-200 text-gray-600"><Actions /></button>
    </div>);
};
export default memo(Column);
