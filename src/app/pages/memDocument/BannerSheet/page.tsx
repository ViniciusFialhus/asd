"use client";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.containerBannerSheet} id="containerBannerSheet">
        <div className={styles.containerLeft}></div>
        <div className={styles.containerRigth}>
        </div>
      </div>
    </main>
  );
}
