import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import App from './three/index';

export default function Home() {
  return (
    <div className={styles.container}>
       <div id='root'></div>
       <App />
    </div>
  )
}
