import { useEffect, useState, useContext, memo, FC } from "react";
import { useRouter } from "next/router";
import { databaseApiSchema } from "../types/Table";
import Navbar from "../components/Navbar/Navbar";
import { getUserDataOnUID } from "../runnables/firebase_api";
import { UserContext } from "./_app";
import { addDatabase } from "../runnables/common_runnables";
import DashboardDBTile from "../components/DashboardDBTile/DashboardDBTile";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { devUrl, isDev, productionUrl } from "../default_objects/default_strings";

interface Props {
  vuid: string;
  userData: databaseApiSchema[];
}

const Dashboard: FC<Props> = ({ vuid, userData }) => {
  const [db, setDB] = useState<databaseApiSchema[]>(userData);
  const [loading, setLoading] = useState<boolean>(false);
  const { user, updateUser } = useContext(UserContext);
  const router = useRouter();
  const refreshPage = () => {
    setLoading(true);
    setDB(userData);
    if(router.isReady){
      router.reload();
    };
  }
  return (
    <>
      <Navbar>
        {/* <DropDown alignment="bottom" title="Table Colors" mainIcon={ColorSwatch}>
                    <div className="grid grid-cols-4 gap-2">{colors.map((item, index) => <Menu.Item as="button" key={index}>{item}</Menu.Item>)}</div>
                </DropDown> */}
        <button
          className="btn bg-white text-red-500 font-semibold"
          onClick={() => {
            document.cookie =
              "vdb_user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie =
              "vdb_uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            updateUser({ ...user, isLoggedIn: false });
          }}
        >
          Sign out
        </button>
      </Navbar>
      <section className="flex flex-col">
        <div className="text-white text-3xl  lg:text-5xl px-4 font-bold pt-24 pb-24 bg-gradient-to-br from-indigo-600 dark:to-black to-white">
          <h1 className="mx-auto container">Your Diagrams</h1>
        </div>
        <div className="flex flex-col mx-auto container px-2 lg:px-0 space-y-4 ">
          <div className="bg-white -mt-16 dark:bg-accent-gray flex flex-col space-y-4 px-4 py-8 rounded-xl border-opacity-50 shadow-md  dark:border border-accent-gray-light">
            <div>
              {/* <Link href="/playground"> */}
              <button onClick={async () => {
                const data = await addDatabase(user.uid);
                if (data) {
                  console.log(data);
                  refreshPage();
                }
              }}
                className="btn bg-rose-500 text-white text-base font-semibold float-right">
                {loading ? <span className="border-4 animate-spin block bg-transparent rounded-full border-rose-400 border-t-white w-8 h-8"></span> : `New Diagram`}
              </button>
              {/* </Link> */}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {!loading ? (
                db.map(({ id, name, database }) => (
                  <DashboardDBTile refreshPage={refreshPage} key={id} id={id} name={name} database={database} loading={loading} setLoading={setLoading} />
                ))
              ) : (
                <div className="bg-accent-gray-light w-full h-20 animate-pulse rounded-xl"></div>
              )}
            </div>
            {
              (!db || db.length === 0) && !loading && <div className="text-white">Nothing is here</div>
            }
          </div>
        </div>
      </section>
    </>
  );
};
export default memo(Dashboard);

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const uid = context.req.cookies["vdb_uid"];
  const response = await fetch(`${isDev ? devUrl : productionUrl}/api/data/read?uid=${uid}`);
  const userData =await  response.json();
  return {
    props: {
      uid, userData
    }
  }
}
