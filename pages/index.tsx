import { useContext } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from "../components/Navbar/Navbar"
import styles from '../styles/Home.module.css';
import { UserContext } from './_app';
import Head from 'next/head';

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
            <button className="btn bg-fuchsia-500 rounded-full text-base text-white" role="application">Dashboard</button>
          </Link> : <><Link href="/login">
            <button className="btn bg-transparent text-base text-white" role="application">Login</button>
          </Link>
            <Link href="/register">
              <button className="btn bg-purple-500 rounded-full text-base text-white font-semibold" role="application">Try Visual-db</button>
            </Link>
          </>
        }

      </Navbar>
      <main className="pt-16 px-4 md:px-0">
        <section className="pt-16 sm:pt-24">
          <div className="flex flex-col dark:text-white mx-auto container space-y-4">
            <div className="flex flex-col md:justify-center md:items-center space-y-4">
              <h1 className="text-5xl sm:text-7xl md:text-center font-semibold">Beautiful database diagrams</h1>
              <h1 className="text-2xl">Create, visualize and collaborate on your database entity relationship diagrams</h1>
              <Link href="/playground"><button className="btn text-white sm:max-w-[50%] font-semibold text-xl bg-green-500">Get Started</button></Link>
            </div>
            <div className="flex justify-center ">
              <Image priority={true} quality={100} className=""  src={ImageLoader()} alt="visual-db-hero" width={1000} height={500} objectFit="contain" />
            </div>
          </div>
        </section>
        {/* <Playground/> */}
      </main>
    </>
  )
}

export default Home
