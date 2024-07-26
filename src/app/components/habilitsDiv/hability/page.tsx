"use client";
import styles from "./page.module.css";
import { ChangeEvent } from "react";

interface HabilityProps {
  readonly type: string;
  readonly height?: string | number;
  readonly width?: string | number;
  readonly abiltyValue: any;
  readonly onChange: (type: string, value: number) => void;
  readonly utils: boolean;
}

export default function Hability({
  type,
  height,
  width,
  onChange,
  abiltyValue,
  utils,
}: HabilityProps) {
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, 2);
    const numericValue = Number(value) || 0;
    onChange(type, numericValue);
  };
  return (
    <main className={styles.main} style={{ height: height, width: width }}>
      <div className={styles.containerNameType}>{type}</div>
      <div className={styles.containerNameInput}>
        <input
          type="number"
          onChange={handleInput}
          defaultValue={abiltyValue}
          min="0"
          style={{ pointerEvents: utils ? "auto" : "none" }}
        />
      </div>
    </main>
  );
}
