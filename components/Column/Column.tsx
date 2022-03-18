import React, { memo, useContext, useState } from 'react';
import { Menu } from '@headlessui/react';
import { tableSetterPair } from '../../types/Table';
import { Actions, Key, Trash } from '../../elements/Icons/Icons';
import { columnSchema } from '../../types/Table';
import { CustomListBox } from '../CustomListBox/CustomListBox';
import { DatabaseContext } from '../Playground/Playground';
import { TableContext } from '../TableEditor/TableEditor';
import DropDown from '../DropDown/DropDown';
import { constraintTypes, keyTypes } from '../../default_objects/table_defaults';
import { changeColumnName, deleteColumn, updateConstraints, updateKey, updateNullable } from '../../runnables/column_runnables';
import columnStyles from "./Column.module.css";

interface Props {
    item: columnSchema;
}

const Column: React.FC<Props> = ({ item }) => {
    const { name, id, nullable, dataType, keyType } = item;
    const { database, updateDatabase } = useContext<tableSetterPair>(DatabaseContext);
    const tableId = useContext<number>(TableContext);

    return (<div className={columnStyles.main}>
        <input
            type="text"
            placeholder={name}
            value={name}
            onChange={e => changeColumnName(database, updateDatabase, tableId, id, e.target.value)}
            className={columnStyles.columnNameEditor}
        />
        <CustomListBox columnId={id} dataType={dataType} />
        <label htmlFor={`table_${tableId}_column_${id}_nullable`} className={`${nullable ? columnStyles.isNullable : columnStyles.isNotNullable} ${columnStyles.nullableBaseStyle}`} title="Nullable!">N</label>
        <input className="hidden" type="checkbox" checked={nullable} id={`table_${tableId}_column_${id}_nullable`} name={`table_${tableId}_column_${id}`} onChange={() => updateNullable(database, updateDatabase, tableId, id)} />
        <DropDown alignment="right" title="Index Type" mainIcon={Key}>
            {keyTypes.map(({ type, Icon }, index) => <Menu.Item key={index} as="div" className={`${columnStyles.keyTypeBaseStyle} ${type === keyType && "bg-slate-800"} `} onClick={() => updateKey(type, database, updateDatabase, tableId, id)}>{type}<Icon />
            </Menu.Item>)}
        </DropDown>
        <DropDown alignment="right" title="Column Options" mainIcon={Actions}>
            {constraintTypes.map(({ type, name }, index) => <Menu.Item key={index} as="div" className={`${columnStyles.constraintTypeBaseStyle} ${item[type] && "bg-slate-800"}  w-full`}>
                <label htmlFor={`table_${tableId}_column_${id}_${type}`} className="cursor-pointer">{name}</label>
                <input type="checkbox" id={`table_${tableId}_column_${id}_${type}`} checked={item[type]} onChange={() => updateConstraints(type, database, updateDatabase, tableId, id)} className="hidden" />
            </Menu.Item>)}
            <Menu.Item onClick={() => deleteColumn(database, updateDatabase, tableId, id)} as="button" className={columnStyles.deleteColumnButton}>
                Delete Column <Trash />
            </Menu.Item>
        </DropDown>
    </div>);
};
export default memo(Column);
