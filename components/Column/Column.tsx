import React, { memo, useContext, useState } from 'react';
import { tableSchema, tableSetterPair } from '../../types/Table';
import { Actions, Key } from '../../elements/Icons/Icons';
import { columnSchema } from '../../types/Table';
import { CustomListBox } from '../CustomListBox/CustomListBox';
import { DatabaseContext } from '../Playground/Playground';
import { getUpdatedTables } from "../../runnables/tablesIterator";
import { TableContext } from '../TableEditor/TableEditor';
import DropDown from '../DropDown/DropDown';
import { Menu } from '@headlessui/react';
import { constraintTypes, keyTypes } from '../../default_objects/table_defaults';
interface Props {
    item: columnSchema;
}

const Column: React.FC<Props> = ({ item }) => {
    const { name, id, nullable, dataType, keyType, autoIncrement, unsigned } = item;
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
    const updateKey = (value: string) => {
        const updatedTables: tableSchema[] = getUpdatedTables(database, tableId, id, value, "keyType");
        updateDatabase(updatedTables);
    }
    const updateConstraints: (type: string) => void = (type) => {
        const updatedTables: tableSchema[] = getUpdatedTables(database, tableId, id, type, type);
        updateDatabase(updatedTables);
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
        <label htmlFor={`table_${tableId}_column_${id}_nullable`} className={`${nullable ? "text-white bg-blue-500 rounded-full hover:bg-blue-600" : "text-black"} font-semibold p-2 rounded flex justify-center items-center  text-center shadow-none  `} title="Nullable!">N</label>
        <input className="hidden" type="checkbox" checked={nullable} id={`table_${tableId}_column_${id}_nullable`} name={`table_${tableId}_column_${id}`} onChange={() => { updateNullable() }} />
        <DropDown title="Index Type" mainIcon={Key}>
            {keyTypes.map(({ type, Icon }, index) => <Menu.Item key={index} as="div" className={`capitalize py-1 flex items-center cursor-pointer rounded font-semibold  flex-1 px-2 hover:bg-slate-700 justify-between ${type === keyType && "bg-slate-800"}  w-full`} onClick={() => updateKey(type)}>{type}<Icon />
            </Menu.Item>)}
        </DropDown>
        <DropDown title="Column Options" mainIcon={Actions}>
            {constraintTypes.map(({ type, name }, index) => <Menu.Item key={index} as="div" className={`capitalize  flex items-center cursor-pointer rounded font-semibold  flex-1 px-2 hover:bg-slate-700 justify-between ${item[type] && "bg-slate-800"}  w-full`}>
                <label htmlFor={`table_${tableId}_column_${id}_${type}`} className="cursor-pointer">{name}</label>
                <input type="checkbox" id={`table_${tableId}_column_${id}_${type}`} checked={item[type]} onChange={() => updateConstraints(type)} className="hidden" />
            </Menu.Item>)}
        </DropDown>
    </div>);
};
export default memo(Column);
