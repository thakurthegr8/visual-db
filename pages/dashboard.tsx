import { useState, useContext, useEffect, FC } from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { databaseApiSchema } from "../types/Table";
import Navbar from "../components/Navbar/Navbar";
import { getUserDataOnUID, getUserDetailsOnUID, saveUserDetails } from "../runnables/firebase_api";
import { UserContext } from "./_app";
import { addDatabase } from "../runnables/firebase_api";
import DashboardDBTile from "../components/DashboardDBTile/DashboardDBTile";
import DashboardStyles from "../styles/Dashboard.module.css";
import DropDown from "../components/DropDown/DropDown";
import { ColorSwatch, User } from "../elements/Icons/Icons";
import { Menu } from "@headlessui/react";
import DialogBox from "../components/DialogBox/DialogBox";
import InputField from "../components/InputField/InputField";
interface Props {
  uid: string;
  userData: databaseApiSchema[];
  userDetails: any;
}

const Dashboard: FC<Props> = ({ uid, userData, userDetails }) => {
  const [db, setDB] = useState<databaseApiSchema[]>(userData);
  const [loading, setLoading] = useState<boolean>(false);
  const { user, updateUser } = useContext(UserContext);
  const [userName, setUserName] = useState<string>(userDetails.name.length !== 0 ? userDetails.name : "Unknown user");
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
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
      <Navbar isCollapsible={true}>
        <DropDown alignment="bottom" text={userDetails.name.length !== 0 ? userDetails.name : "Unknown user"} title="" mainIcon={User}>
          <div className="flex flex-col items-stretch justify-stretch text-base ">
            <Menu.Item onClick={() => setDialogOpen(true)} as="button" className="btn  text-left hover:bg-accent-gray-light">Profile Settings</Menu.Item>
            <Menu.Item as="button" className="btn bg-red-900 bg-opacity-50 text-red-500 text-left hover:bg-accent-gray-light"
              onClick={() => {
                document.cookie =
                  "vdb_user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                document.cookie =
                  "vdb_uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                updateUser({ ...user, isLoggedIn: false });
                router.push("/");
              }}>Sign Out</Menu.Item></div>
        </DropDown>

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
        <DialogBox isDialogOpen={isDialogOpen} setDialogOpen={setDialogOpen}>
          <div className="flex flex-col space-y-2">
            <h1 className="text-4xl">Edit Profile</h1>
            <form onSubmit={async e => {
              e.preventDefault();
              if (userName !== userDetails.name) {
                setLoading(true);
                const data = await saveUserDetails(userDetails.id, userName);
                if (data) {
                  refreshPage();
                }
              }
            }} className="flex flex-col space-y-2">
              <InputField type="text" value={userName} handler={setUserName} placeholder="Enter name..." />
              <div>
                <button className="btn bg-blue-700" type="submit">
                  {loading  ? <span className="loader-rounded border-blue-700"></span> : `Save`}
                </button>
              </div>
            </form>
          </div>
        </DialogBox>
      </section>
    </>
  );
};
export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const uid = context.req.cookies["vdb_uid"];
  const userData = await getUserDataOnUID(uid);
  const userDetails = await getUserDetailsOnUID(uid);
  return {
    props: {
      uid, userData, userDetails
    }
  }
}
