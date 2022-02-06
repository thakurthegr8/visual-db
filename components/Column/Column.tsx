import React, { memo } from 'react';
import { Actions, Key } from '../../elements/Icons/Icons';
import { columnSchema } from '../../types/Table';
import { CustomListBox } from '../CustomListBox/CustomListBox';
interface Props {
    item: columnSchema;
}
const Column: React.FC<Props> = ({ item }) => {
    const {name, id,nullable} = item;
    const changeColumnName = ()=>{
        
    }
    return (<div className="p-2 hover:bg-gray-100 space-x-4 flex items-center justify-between">
        <input
            type="text"
            placeholder={item.name}
            value={item.name}
            className=" max-w-[4rem] p-1 rounded outline-none focus:ring-2 focus:ring-offset-blue-600"
        />
        <CustomListBox />
        <label htmlFor={`${item.id}`} className="font-semibold p-2 rounded flex justify-center items-center  text-center shadow-none  hover:bg-gray-200" title="Nullable!">N</label>
        <input type="checkbox" value={`${item.nullable}`} id={`${item.id}`} className="hidden" />
        <button className="btn shadow-none hover:bg-gray-200 text-gray-600"><Key /></button>
        <button className="btn shadow-none hover:bg-gray-200 text-gray-600"><Actions /></button>
    </div>);
};
export default memo(Column);
