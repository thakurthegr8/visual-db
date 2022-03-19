import React, {
  createContext,
  memo,
  useState,
  useEffect,
  useContext,
} from "react";
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
import { UserContext } from "../../pages/_app";
import { saveDatabase } from "../../runnables/common_runnables";


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
  const { user } = useContext(UserContext);
  const updateDatabase = (ntables: tableSchema[]) => {
    setDatabase(ntables);
  };

  const [cols, setCols] = useState(1);
  const [database, setDatabase] = useState<tableSchema[]>([]);
  const [dbName, setDbName]= useState<string>("");
  const [dbId, setDbId]= useState<string>("");
  const router = useRouter();
  useEffect(() => {
    const qid: string = router.query.db_id as string;
    if (qid) getDatabaseDataOnDbID(qid, setDatabase,setDbName,setDbId);
  }, [router.query.db_id]);
  useEffect(() => {
    if (window.innerWidth >= 768) {
      setCols(3);
    } else if (window.innerWidth >= 640) {
      setCols(3);
    }
  }, []);
  useEffect(()=>{
    console.log(JSON.stringify(database));
  },[database]);
  // useEffect(() => {
  //   console.log(JSON.stringify(database));
  // }, [database]);
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
            {user.isLoggedIn && router.query.db_id && (
              <button
                role="save table"
                className={`btn bg-white font-semibold text-black ${playgroundStyles.createTableButton}`}
                onClick={()=>saveDatabase(dbId,dbName,JSON.stringify(database))}
              >
                {`Save`}
              </button>
            )}
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
export default Playground;
