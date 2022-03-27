import React, {
  createContext,
  memo,
  useState,
  useEffect,
  useContext,
} from "react";
import {
  tableSchema,
  tableSetterPair,
} from "../../types/Table";
import TableEditor from "../TableEditor/TableEditor";
import playgroundStyles from "./Playground.module.css";
import { addTable } from "../../runnables/playground_runnables";
import TableModel from "../TableModel/TableModel";
import Masonry from "react-masonry-css";
import { getDatabaseDataOnDbID, saveDatabase } from "../../runnables/firebase_api";
import { useRouter } from "next/router";
import { UserContext } from "../../pages/_app";
import Head from "next/head";


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

  const [loading, setLoading] = useState<boolean>(true);
  const [cols, setCols] = useState(1);
  const [database, setDatabase] = useState<tableSchema[]>([]);
  const [dbName, setDbName] = useState<string>("");
  const [dbId, setDbId] = useState<string>("");
  const router = useRouter();
  useEffect(() => {
    const fetchFirstData = async () => {
      const qid: string = router.query.db_id as string;
      const data = await getDatabaseDataOnDbID(qid, setDatabase, setDbName, setDbId);
      if (data) {
        setLoading(false);
      }
    }
    if (router.query.db_id !== undefined) {
      fetchFirstData();
    } else {
      setLoading(false);
    }
  }, [router.query.db_id]);
  useEffect(() => {
    if (window.innerWidth >= 768) {
      setCols(3);
    } else if (window.innerWidth >= 640) {
      setCols(3);
    }
  }, []);
  const fetchData = async () => {
    const qid: string = router.query.db_id as string;
    const savedData = await saveDatabase(dbId, dbName, JSON.stringify(database))
    if (savedData) {
      const data = await getDatabaseDataOnDbID(qid, setDatabase, setDbName, setDbId);
      if (data)
        setLoading(false)
    }
  }

  return (
    <>
      <Head><title>Playground</title></Head>
      <div className={playgroundStyles.mainGrid}>
        <Sidebar>
          <div className="px-2 py-2  bg-blue-500">
            {loading ? <span className="loader-rounded border-blue-400"></span> : <span className="text-white font-semibold p-1 text-xl">{dbName}</span>}
          </div>
          <div className={playgroundStyles.sidebarAfterContainer}>
            <span>{`Tables`}</span>
            <div className="space-x-2">
              <button
                role="create table"
                className={`btn btn-blue ${playgroundStyles.createTableButton}`}
                onClick={() => addTable(database, setDatabase)}
              >
                {loading ? <span className="border-4 animate-spin block bg-transparent rounded-full border-blue-400 border-t-white w-8 h-8"></span> : `Create table`}
              </button>
              {user.isLoggedIn && router.query.db_id && (
                <button
                  role="save table"
                  className={`btn bg-white font-semibold text-black ${playgroundStyles.createTableButton}`}
                  onClick={() => {
                    setLoading(true);
                    fetchData();
                  }}
                >
                  {loading ? <span className="border-4 animate-spin block bg-transparent rounded-full border-black border-t-white w-8 h-8"></span> : `Save`}
                </button>
              )}
            </div>
          </div>
          {loading ? <div className="h-full w-full border-accent-gray  bg-accent-gray-light rounded animate-pulse"></div> : <DatabaseContext.Provider value={{ database, updateDatabase }}>
            {database.map((item) => (
              <TableEditor key={item.id} data={item} />
            ))}
          </DatabaseContext.Provider>}
        </Sidebar>{
          loading ? <div className="h-full w-full col-span-3  border-accent-gray  bg-accent-gray-light rounded animate-pulse"></div> :
            <Masonry
              breakpointCols={cols}
              className="flex col-span-3 gap-3 p-2 dark:bg-accent-gray"
              columnClassName="flex flex-col gap-y-3"
            >
              {database.map((table, index) => (
                <TableModel key={index} tableData={table} />
              ))}
            </Masonry>}

      </div>
    </>
  );
};
export default Playground;
