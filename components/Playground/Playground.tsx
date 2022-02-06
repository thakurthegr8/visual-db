import React, { createContext, memo, useState } from "react";
import { newColumn, newTable } from "../../default_objects/table_defaults";
import { columnSchema, tableSchema,tableSetterPair } from "../../types/Table";
import TableEditor from "../TableEditor/TableEditor";

const defaultTableSetterPairState = {
  tables: [],

}
const Sidebar: React.FC = ({ children }) => {
  return <div className="column-layout border-r border-gray-300 ">{children}</div>
}
export const TableContext = createContext<tableSetterPair>({} as tableSetterPair);
const Playground = () => {
  const addTable = () => {
    const ntable: tableSchema = newTable(tables.length);
    const nColumn: columnSchema = newColumn(0);
    ntable.columns.push(nColumn);
    setTables(table => [...table, ntable]);
  }
  const addNewTables = (ntables:tableSchema[])=>{
    setTables(ntables);
  }
  const [tables, setTables] = useState<tableSchema[]>([]);
  return (
    <div className="py-1 grid grid-cols-4 h-screen">
      <Sidebar>
        <div className="flex justify-between items-center p-2 shadow-xl">
          <span>Tables</span>
          <button role="create table" className="btn btn-blue" onClick={addTable}>
            Create table
          </button>
        </div>
        <TableContext.Provider value={{ tables, addNewTables }}>
          {tables.map(item => <TableEditor key={item.id} data={item} />)}
        </TableContext.Provider>
      </Sidebar>
      <div className="col-span-3 grid grid-cols-3 bg-gray-200"></div>
    </div>
  );
};
export default memo(Playground);
