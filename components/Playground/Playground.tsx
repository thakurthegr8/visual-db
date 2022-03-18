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
import { getDatabaseDataOnDbID } from "../../runnables/firebase_api";
import { useRouter } from "next/router";



const saveDatabase = (
  id: string ,
  name: string,
  database: string
) => {
  console.log(database);
  fetch(
    `http://localhost:3000/api/update`,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({id:id, name:name,database:database})
    }
  ).then(res=>res.json())
  .then(data=>console.log(data));
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
const Playground: React.FC = (props) => {
  const updateDatabase = (ntables: tableSchema[]) => {
    setDatabase(ntables);
  };
  const [cols, setCols] = useState(1);
  const [database, setDatabase] = useState<tableSchema[]>([]);
  const router = useRouter();
  useEffect(() => {
    if (window.innerWidth >= 768) {
      setCols(3);
    } else if (window.innerWidth >= 640) {
      setCols(3);
    }
  }, []);
  useEffect(() => {
    const qid:string = router.query.db_id as string;
    if(qid)
    getDatabaseDataOnDbID(qid, setDatabase);
  }, []);

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
