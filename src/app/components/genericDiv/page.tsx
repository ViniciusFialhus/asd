"use client";
import styles from "./page.module.css";

export default function GenericDiv({ type }: { type: string }) {
  return (
    <main className={styles.main}>
      <div className={styles.containerNameType}>{type}</div>
      <div className={styles.containerNameInput}>
        <textarea />
      </div>
    </main>
  );
}
