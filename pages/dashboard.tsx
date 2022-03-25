import { useState, useContext, FC } from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { databaseApiSchema } from "../types/Table";
import Navbar from "../components/Navbar/Navbar";
import { getUserDataOnUID } from "../runnables/firebase_api";
import { UserContext } from "./_app";
import { addDatabase } from "../runnables/firebase_api";
import DashboardDBTile from "../components/DashboardDBTile/DashboardDBTile";
import DashboardStyles from "../styles/Dashboard.module.css";

interface Props {
  uid: string;
  userData: databaseApiSchema[];
}

const Dashboard: FC<Props> = ({ uid, userData }) => {
  const [db, setDB] = useState<databaseApiSchema[]>(userData);
  const [loading, setLoading] = useState<boolean>(false);
  const { user, updateUser } = useContext(UserContext);
  const router = useRouter();
  const refreshPage = () => {
    if (router.isReady) {
      setLoading(false);
      router.reload();
    };
  }
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Navbar>
        {/* <DropDown alignment="bottom" title="Table Colors" mainIcon={ColorSwatch}>
                    <div className="grid grid-cols-4 gap-2">{colors.map((item, index) => <Menu.Item as="button" key={index}>{item}</Menu.Item>)}</div>
                </DropDown> */}
        <button
          className={`btn ${DashboardStyles.signOutButton}`}
          onClick={() => {
            document.cookie =
              "vdb_user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie =
              "vdb_uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            updateUser({ ...user, isLoggedIn: false });
            router.push("/");
          }}
        >
          Sign out
        </button>
      </Navbar>
      <section className={DashboardStyles.main}>
        <div className={DashboardStyles.userInfoContainer}>
          <h1 className={DashboardStyles.title}>Your Diagrams</h1>
        </div>
        <div className={DashboardStyles.DBTilesCardContainer}>
          <div className={DashboardStyles.DBTilesCard}>
            <div>
              {/* <Link href="/playground"> */}
              <button onClick={async () => {
                setLoading(true);
                const data = await addDatabase(user.uid);
                if (data) {
                  console.log(data);
                  refreshPage();
                }
              }}
                className={`btn ${DashboardStyles.newDiagramButton}`}>
                {loading ? <span className="loader-rounded border-black"></span> : `New Diagram`}
              </button>
              {/* </Link> */}
            </div>
            <div className={DashboardStyles.DBTilesGrid}>
              {!loading ? (
                db.map(({ id, name, database }) => (
                  <DashboardDBTile refreshPage={refreshPage} key={id} id={id} name={name} database={database} loading={loading} setLoading={setLoading} />
                ))
              ) : (
                <div className={DashboardStyles.pulseLoader}></div>
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
export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const uid = context.req.cookies["vdb_uid"];
  const userData = await getUserDataOnUID(uid);
  return {
    props: {
      uid, userData
    }
  }
}
