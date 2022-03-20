import { useEffect, useState, useContext, memo } from "react";
import { useRouter } from "next/router";
import { databaseApiSchema } from "../types/Table";
import Navbar from "../components/Navbar/Navbar";
import { getUserDataOnUID } from "../runnables/firebase_api";
import { UserContext } from "./_app";
import { addDatabase } from "../runnables/common_runnables";
import DashboardDBTile from "../components/DashboardDBTile/DashboardDBTile";
const Dashboard = () => {
  const [db, setDB] = useState<databaseApiSchema[]>([] as databaseApiSchema[]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user, updateUser } = useContext(UserContext);
  const router = useRouter();
  useEffect(() => {
    if (document.cookie.length == 0) {
      router.push("/login");
    }
    async function fetchUserData() {
      const userData = await getUserDataOnUID(user.uid);
      setDB(userData);
    }
    if (loading) {
      fetchUserData();
    }
    setLoading(false);
  }, [user, loading]);
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
              <button onClick={() => {
                addDatabase(user.uid);
                setLoading(true);
              }}
                className="btn bg-rose-500 text-white text-base font-semibold float-right">
                {loading ? <span className="border-4 animate-spin block bg-transparent rounded-full border-rose-400 border-t-white w-8 h-8"></span> : `New Diagram`}
              </button>
              {/* </Link> */}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {!loading ? (
                db.map(({ id, name, database }) => (
                  <DashboardDBTile key={id} id={id} name={name} database={database} loading={loading} setLoading={setLoading} />
                ))
              ) : (
                <div className="bg-accent-gray-light w-full h-20 animate-pulse rounded-xl"></div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default memo(Dashboard);


