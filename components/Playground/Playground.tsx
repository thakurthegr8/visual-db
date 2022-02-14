import React, { createContext, memo, useState, useEffect } from "react";
import { tableSchema, tableSetterPair } from "../../types/Table";
import TableEditor from "../TableEditor/TableEditor";
import playgroundStyles from "./Playground.module.css";
import { addTable } from "../../runnables/playground_runnables";
import TableModel from "../TableModel/TableModel";
import Masonry from "react-masonry-css";


const Sidebar: React.FC = ({ children }) => {
  return <div className={`column-layout ${playgroundStyles.sidebar}`}>{children}</div>
}
export const DatabaseContext = createContext<tableSetterPair>({} as tableSetterPair);
const Playground = () => {
  const updateDatabase = (ntables: tableSchema[]) => {
    setDatabase(ntables);
  }
  const [cols, setCols] = useState(1);
  useEffect(() => {
    if (window.innerWidth >= 768) {
      setCols(3);
    } else if (window.innerWidth >= 640) {
      setCols(3);
    }
  });
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
      <Masonry breakpointCols={cols} className="flex col-span-3 gap-2 p-2 bg-accent-gray" columnClassName="flex flex-col gap-y-2">
        {
          database.map((table, index) => <TableModel key={index} tableData={table} />)
        }
      </Masonry>

    </div>
  );
};
export default memo(Playground);
