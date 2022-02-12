import React, { createContext, memo, useState } from "react";
import { tableSchema, tableSetterPair } from "../../types/Table";
import TableEditor from "../TableEditor/TableEditor";
import playgroundStyles from "./Playground.module.css";
import { addTable } from "../../runnables/playground_runnables";
import TableModel from "../TableModel/TableModel";


const Sidebar: React.FC = ({ children }) => {
  return <div className={`column-layout ${playgroundStyles.sidebar}`}>{children}</div>
}
export const DatabaseContext = createContext<tableSetterPair>({} as tableSetterPair);
const Playground = () => {
  const updateDatabase = (ntables: tableSchema[]) => {
    setDatabase(ntables);
  }
  const [database, setDatabase] = useState<tableSchema[]>([]);
  return (
    <div className={playgroundStyles.mainGrid}>
      <Sidebar>
        <div className={playgroundStyles.sidebarAfterContainer}>
          <span>{`Tables`}</span>
          <button role="create table" className={`btn btn-blue ${playgroundStyles.createTableButton}`} onClick={() => addTable(database, setDatabase)}>
            {`Create table`}
          </button>
        </div>
        <DatabaseContext.Provider value={{ database, updateDatabase }}>
          {database.map(item => <TableEditor key={item.id} data={item} />)}
        </DatabaseContext.Provider>
      </Sidebar>
      <div className={playgroundStyles.subGrid}>
        {
          database.map((table, index) => <TableModel key={index} tableData={table} />)
        }
      </div>
    </div>
  );
};
export default memo(Playground);
