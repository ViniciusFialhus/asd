"use client";
import styles from "./page.module.css";
import { ChangeEvent } from "react";

export default function DefensesDiv() {
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length > 2) {
      e.target.value = value.slice(0, 2);
    }
  };
  return (
    <main className={styles.main}>
      <div className={styles.containerNameType}>DEFESAS</div>
      <div className={styles.containerNameInput}>
        <div className={styles.containerList}>
          <div className={styles.containerOneDefense}>
            <div className={styles.containerName}>
              ESQUIVA
              <input
                defaultValue={0}
                type="number"
                maxLength={2}
                onInput={handleInput}
              />
            </div>
          </div>
          <div className={styles.containerTwoDefense}>
            <div className={styles.containerName}>
              FORTITUDE
              <input
                defaultValue={0}
                type="number"
                maxLength={2}
                onInput={handleInput}
              />
            </div>
          </div>
        </div>

        <div className={styles.containerList} style={{backgroundColor: "black", color: "white"}}>
          <div className={styles.containerOneDefense}>
            <div className={styles.containerName}>
              APARAR
              <input
                defaultValue={0}
                type="number"
                maxLength={2}
                onInput={handleInput}
                style={{ color: "white", top: "1px"}}
              />
            </div>
          </div>
          <div className={styles.containerTwoDefense}>
            <div className={styles.containerName}>
              RESISTÊNCIA
              <input
                defaultValue={0}
                type="number"
                maxLength={2}
                onInput={handleInput}
                style={{width: "43%", color: "white", top: "1px"}}
              />
            </div>
          </div>
        </div>
       
        <div className={styles.containerList} style={{ height: "40%" }}>
          <div className={styles.containerOneDefense}>
            <div className={styles.containerName} style={{ marginTop: "5px" }}>
              VONTADE
              <input
                defaultValue={0}
                type="number"
                maxLength={2}
                onInput={handleInput}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
