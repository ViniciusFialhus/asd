"use client";
import styles from "./page.module.css";
import { ChangeEvent } from "react";

interface HabilityProps {
  readonly type: string;
  readonly height?: string | number;
  readonly width?: string | number;
}

export default function Hability({ type, height, width }: HabilityProps) {
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length > 2) {
      e.target.value = value.slice(0, 2);
    }
  };
  return (
    <main className={styles.main} style={{ height: height, width: width }}>
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
