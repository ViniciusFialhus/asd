"use client";
import styles from "./page.module.css";
import { ChangeEvent, useState, useRef, useEffect } from "react";

interface ColorsAttacksCollum {
  id: string;
  color: string;
  textColor: string;
}

interface AttacksDivProps {
  readonly height: string | number;
  readonly width: string | number;
  readonly style: any;
  readonly onMouseDown?: any;
  readonly onMouseMove?: any;
}

export default function AttacksDiv({
  height,
  width,
  style,
  onMouseDown,
  onMouseMove,
}: AttacksDivProps) {
  const [isNextBlack, setIsNextBlack] = useState<boolean>(false);
  const [colorAttacks, setColorAttacks] = useState<ColorsAttacksCollum[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const [utils, setUtils] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length > 2) {
      e.target.value = value.slice(0, 2);
    }
  };
  const addNewAttack = () => {
    if (utils) {
      const newAttack: ColorsAttacksCollum = {
        id: new Date().toISOString(),
        color: isNextBlack ? "white" : "black",
        textColor: isNextBlack ? "black" : "white",
      };

      setColorAttacks((prevAttacksColors) => [...prevAttacksColors, newAttack]);
      setIsNextBlack(!isNextBlack);
    }
  };

  const handleDobleClick = () => {
    setUtils(true);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setUtils(false);
    }
  };

  useEffect(() => {
    const handleGlobalMouseDown = () => setMouseDown(true);
    const handleGlobalMouseUp = () => setMouseDown(false);

    window.addEventListener("mousedown", handleGlobalMouseDown);
    window.addEventListener("mouseup", handleGlobalMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleGlobalMouseDown);
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, []);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <main
      ref={ref}
      className={styles.main}
      style={{
        ...style,
        minHeight: height,
        width: width,
        cursor: mouseDown ? "grabbing" : "grab",
      }}
      onDoubleClick={handleDobleClick}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
    >
      <section className={styles.containerBase}>
        <div className={styles.containerNameType}>ATAQUE</div>
        <div className={styles.containerNameInput}>
          <div className={styles.containerInitiative}>
            <div>INICIATIVA +</div>
            <input
              defaultValue={"0"}
              type="number"
              maxLength={2}
              onInput={handleInput}
            />
          </div>
          {colorAttacks.map((attack) => (
            <div
              key={attack.id}
              className={styles.containerNewAttack}
              style={{ backgroundColor: attack.color, color: attack.textColor }}
            >
              <div className={styles.containerNameAttack}>
                <input
                  defaultValue={"Texto Mudável"}
                  style={{ color: attack.textColor }}
                />
              </div>
              <div className={styles.containerDamege}>
                <input
                  defaultValue={"Texto Mudável"}
                  style={{ color: attack.textColor }}
                />
              </div>
            </div>
          ))}
        </div>
        {utils && (
          <div className={styles.containerButtonAddNew}>
            <button
              className={styles.containerSpan}
              type="button"
              onClick={addNewAttack}
            >
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
        )}
      </section>
      <section className={styles.containerIcon}>
        {utils && (
          <>
            <div className={styles.containerSpanUtils}>
              <span className="material-symbols-outlined">delete</span>
            </div>
            <div className={styles.containerSpanUtils}>
              <span className="material-symbols-outlined">recenter</span>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
