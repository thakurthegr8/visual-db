import React, { createContext, memo, useState, useEffect } from "react";
import { newColumn, newTable } from "../../default_objects/table_defaults";
import { columnSchema, tableSchema, tableSetterPair } from "../../types/Table";
import TableEditor from "../TableEditor/TableEditor";


const Sidebar: React.FC = ({ children }) => {
  return <div className="column-layout border-r border-gray-300 ">{children}</div>
}
export const DatabaseContext = createContext<tableSetterPair>({} as tableSetterPair);
const Playground = () => {
  const addTable = () => {
    const ntable: tableSchema = newTable(database.length);
    const nColumn: columnSchema = newColumn(0);
    ntable.columns.push(nColumn);
    setDatabase(table => [...table, ntable]);
  }
  const updateDatabase = (ntables: tableSchema[]) => {
    setDatabase(ntables);
  }
  const [database, setDatabase] = useState<tableSchema[]>([]);
  return (
    <div className="py-1 grid grid-cols-4 h-screen">
      <Sidebar>
        <div className="flex justify-between items-center p-2 shadow-xl">
          <span>Tables</span>
          <button role="create table" className="btn btn-blue" onClick={addTable}>
            Create table
          </button>
        </div>
        <DatabaseContext.Provider value={{ database, updateDatabase }}>
          {database.map(item => <TableEditor key={item.id} data={item} />)}
        </DatabaseContext.Provider>
      </Sidebar>
      <div className="col-span-3 grid grid-cols-3 bg-gray-200"></div>
    </div>
  );
};
export default memo(Playground);
