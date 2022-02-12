import React, { createContext, memo, useState, useEffect } from "react";
import { newColumn, newTable } from "../../default_objects/table_defaults";
import { columnSchema, tableSchema, tableSetterPair } from "../../types/Table";
import TableEditor from "../TableEditor/TableEditor";


const Sidebar: React.FC = ({ children }) => {
  return <div className="column-layout lg:border-r border-gray-300 dark:border-accent-gray-light bg-white dark:bg-accent-gray ">{children}</div>
}
export const DatabaseContext = createContext<tableSetterPair>({} as tableSetterPair);
const Playground = () => {
  const addTable = () => {
    const ntable: tableSchema = newTable(database.length == 0 ? database.length : database[database.length - 1].id + 1);
    const nColumn: columnSchema = newColumn(0);
    ntable.columns.push(nColumn);
    setDatabase(table => [...table, ntable]);
  }
  const updateDatabase = (ntables: tableSchema[]) => {
    setDatabase(ntables);
  }
  const [database, setDatabase] = useState<tableSchema[]>([]);
  return (
    <div className="py-1 flex flex-col lg:grid lg:grid-cols-4 h-screen">
      <Sidebar>
        <div className="flex justify-between items-center p-2 shadow-xl dark:bg-accent-gray dark:text-white">
          <span>Tables</span>
          <button role="create table" className="btn btn-blue rounded-full border-blue-700 border" onClick={addTable}>
            Create table
          </button>
        </div>
        <DatabaseContext.Provider value={{ database, updateDatabase }}>
          {database.map(item => <TableEditor key={item.id} data={item} />)}
        </DatabaseContext.Provider>
      </Sidebar>
      <div className="grid md:grid-cols-2 lg:col-span-3 gap-4 p-4 lg:grid-cols-3 bg-gray-200 dark:bg-accent-gray">
        {
          database.map((table, index) => <div key={index} className="column-layout transition row-span-1 dark:bg-black bg-white dark:bg-opacity-40 shadow-md dark:shadow-xl rounded-b  rounded">
            <div className="rounded-t p-2 text-white font-semibold bg-opacity-30" style={{ backgroundColor: table.color }}>{table.name}</div>
            {
              table.columns.map((column, index) =>
                <div key={index} className="p-2 flex justify-between font-semibold dark:text-white ">
                  <span>{column.name}</span>
                  <span>{column.dataType}</span>
                </div>)
            }
          </div>)
        }
      </div>
    </div>
  );
};
export default memo(Playground);
