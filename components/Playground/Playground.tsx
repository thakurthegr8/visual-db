import React, { createContext, memo, useState, useEffect } from "react";
import {
  databaseApiSchema,
  tableSchema,
  tableSetterPair,
} from "../../types/Table";
import TableEditor from "../TableEditor/TableEditor";
import playgroundStyles from "./Playground.module.css";
import { addTable } from "../../runnables/playground_runnables";
import TableModel from "../TableModel/TableModel";
import Masonry from "react-masonry-css";

interface Props {
  data: databaseApiSchema ;
}

const saveDatabase = (
  id: string ,
  name: string,
  database: string
) => {
  fetch(
    `http://localhost:3000/api/update?id=${id}&name=${name}&database=${database}`
  )
    .then((res) => res.json())
    .then((data) => console.log(data));
};

const Sidebar: React.FC = ({ children }) => {
  return (
    <div className={`column-layout ${playgroundStyles.sidebar}`}>
      {children}
    </div>
  );
};
export const DatabaseContext = createContext<tableSetterPair>(
  {} as tableSetterPair
);
const Playground: React.FC<Props> = ({ data }) => {
  const updateDatabase = (ntables: tableSchema[]) => {
    setDatabase(ntables);
  };
  const [cols, setCols] = useState(1);
  const [database, setDatabase] = useState<tableSchema[]>([]);
  useEffect(() => {
    if (window.innerWidth >= 768) {
      setCols(3);
    } else if (window.innerWidth >= 640) {
      setCols(3);
    }
  }, []);
  useEffect(() => {
    if (data) setDatabase(data.database);
  }, [data]);

  useEffect(() => {
    console.log(JSON.stringify(database));
  }, [database]);
  return (
    <div className={playgroundStyles.mainGrid}>
      <Sidebar>
        <div className={playgroundStyles.sidebarAfterContainer}>
          <span>{`Tables`}</span>
          <div className="space-x-2">
            <button
              role="create table"
              className={`btn btn-blue ${playgroundStyles.createTableButton}`}
              onClick={() => addTable(database, setDatabase)}
            >
              {`Create table`}
            </button>
            <button
              role="save table"
              className={`btn bg-white font-semibold text-black ${playgroundStyles.createTableButton}`}
              onClick={() =>
                saveDatabase(
                  data.id,
                  (data.name).toString(),
                  JSON.stringify(database)
                )
              }
            >
              {`Save`}
            </button>
          </div>
        </div>
        <DatabaseContext.Provider value={{ database, updateDatabase }}>
          {database.map((item) => (
            <TableEditor key={item.id} data={item} />
          ))}
        </DatabaseContext.Provider>
      </Sidebar>
      <Masonry
        breakpointCols={cols}
        className="flex col-span-3 gap-2 p-2 dark:bg-accent-gray"
        columnClassName="flex flex-col gap-y-2"
      >
        {database.map((table, index) => (
          <TableModel key={index} tableData={table} />
        ))}
      </Masonry>
    </div>
  );
};
export default memo(Playground);
