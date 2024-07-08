"use client";
import styles from "./page.module.css";
import { ChangeEvent } from "react";

export default function AttacksDiv() {
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length > 2) {
      e.target.value = value.slice(0, 2);
    }
  };
  return (
    <main className={styles.main}>
      <div className={styles.containerNameType}>ATAQUE</div>
      <div className={styles.containerNameInput}>
        <div className={styles.containerInitiative}>
          INICIATIVA +
          <input
            defaultValue={"0"}
            type="number"
            maxLength={2}
            onInput={handleInput}
          />
        </div>
        <div
          className={styles.containerNewAttack}
          style={{ backgroundColor: "black", color: "white", height: "30%" }}
        >
          <div className={styles.containerNameAttack}>Ataque Frenético</div>
          <div className={styles.containerDamege}>
            Área, Dano 6, Coné ( 15 Pés )
          </div>
        </div>
        <div
          className={styles.containerNewAttack}
          style={{ backgroundColor: "white", color: "black",height: "40%" }}
        >
          <div className={styles.containerNameAttack}>Grito Ensurdecedor</div>
          <div className={styles.containerDamege}>
            Aflição 6, Coné ( 15 Pés )
          </div>
        </div>
      </div>
    </main>
  );
}
