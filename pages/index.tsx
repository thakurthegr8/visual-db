import { useContext } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import Navbar from "../components/Navbar/Navbar"
import HomeStyles from '../styles/Home.module.css';
import { UserContext } from './_app';

const ImageLoader = () => {
  return `https://dl.dropboxusercontent.com/s/s6b9yf2zxvl7a2d/https___visual-db.netlify.app.png?dl=0`;
}

const Home: NextPage = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <Head>
        <title>Visual-DB</title>
      </Head>
      <Navbar>
        {
          user.isLoggedIn ? <Link href="/dashboard">
            <button className={`btn ${HomeStyles.dashboardButton}`} role="application">Dashboard</button>
          </Link> : <><Link href="/login">
            <button className={`btn ${HomeStyles.loginButton}`} role="application">Login</button>
          </Link>
            <Link href="/register">
              <button className={`btn ${HomeStyles.tryVisualDbButton}`} role="application">Try Visual-db</button>
            </Link>
          </>
        }

      </Navbar>
      <main className={HomeStyles.main}>
        <section className={HomeStyles.mainSectionChild}>
          <div className={HomeStyles.columnContainer}>
            <div className={HomeStyles.columnFlexContainer}>
              <h1 className={HomeStyles.mainTitle}>Beautiful database diagrams</h1>
              <h1 className={HomeStyles.subTitle}>Create, visualize and collaborate on your database entity relationship diagrams</h1>
              <Link href="/playground"><button className={`btn ${HomeStyles.getStartedButton}`}>Get Started</button></Link>
            </div>
            <div className={HomeStyles.mainImageContainer}>
              <Image priority={true} quality={100} className="" src={ImageLoader()} alt="visual-db-hero" width={1000} height={500} objectFit="contain" />
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default Home
