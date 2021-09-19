import styles from '../styles/Home.module.css'

import App from '/Components/three/index';

export default function Home() {
  return (
    <div className={styles.container}>
       <div id='root'></div>
       <App />
    </div>
  )
}
