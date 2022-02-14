import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Playground from '../components/Playground/Playground'
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <main className="pt-16 px-2 md:px-0">
      <section className="pt-16 sm:pt-24">
        <div className="flex flex-col dark:text-white mx-auto container space-y-4">
          <div className="flex flex-col md:justify-center md:items-center space-y-4">
            <h1 className="text-5xl sm:text-7xl md:text-center font-semibold">Beautiful database diagrams</h1>
            <h1>Create, visualize and collaborate on your database entity relationship diagrams</h1>
            <Link href="/playground"><button className="btn sm:max-w-[50%] font-semibold text-xl bg-green-500">Get Started</button></Link>
          </div>
          <div className="flex justify-center ">
            <Image className="" src="/images/jpgs/hero.png  " alt="visual-db-hero" width={1000} height={500} objectFit="contain" />
          </div>
        </div>
      </section>
      {/* <Playground/> */}
    </main>
  )
}

export default Home
