'use client';
import styles from "./page.module.css";
import { ChangeEvent } from "react";


export default function HabilityDiv({ type }: { type: string }) {
    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length > 2) {
          e.target.value = value.slice(0, 2);
        }
      };
  return (
    <main className={styles.main}>
      <div className={styles.containerNameType}>{type}</div>
      <div className={styles.containerNameInput}>
      <input
      defaultValue={0}
          type="number"
          maxLength={2}
          onInput={handleInput}
        />
      </div>
    </main>
  );
}
