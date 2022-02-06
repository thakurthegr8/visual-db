import type { NextPage } from 'next';
import Playground from '../components/Playground/Playground'
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <main className="pt-12">
    <Playground/>
    </main>
  )
}

export default Home
