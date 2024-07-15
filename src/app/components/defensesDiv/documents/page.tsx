"use client";
import styles from "./page.module.css";
import { ChangeEvent } from "react";
import { useEffect, useRef, useState } from "react";
interface DefensesDivProps {
  readonly height: string | number;
  readonly width: string | number;
  readonly style: any;
  readonly onMouseDown?: any;
  readonly onMouseMove?: any;
}

export default function DefensesDiv({
  height,
  width,
  style,
  onMouseDown,
  onMouseMove,
}: DefensesDivProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [utils, setUtils] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length > 2) {
      e.target.value = value.slice(0, 2);
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
    <div
      ref={ref}
      className={styles.isMain}
      style={{
        ...style,
        height: height,
        width: width,
        cursor: mouseDown ? "grabbing" : "grab",
      }}
      onDoubleClick={handleDobleClick}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
    >
      <section
        className={styles.containerBase}
        style={{ border: utils ? "1px solid #232323" : "" }}
      >
        <div className={styles.containerNameType}>DEFESAS</div>
        <div className={styles.containerNameInput}>
          <div className={styles.containerList}>
            <div className={styles.containerOneDefense}>
              <div>ESQUIVA</div>
              <input
                defaultValue={0}
                type="number"
                maxLength={2}
                onInput={handleInput}
              />
            </div>
            <div className={styles.containerTwoDefense}>
              <div>FORTITUDE</div>
              <input
                defaultValue={0}
                type="number"
                maxLength={2}
                onInput={handleInput}
              />
            </div>
          </div>
          <div
            className={styles.containerList}
            style={{ backgroundColor: "black", color: "white" }}
          >
            <div className={styles.containerOneDefense}>
              <div>APARAR</div>
              <input
                defaultValue={0}
                type="number"
                maxLength={2}
                onInput={handleInput}
                style={{ color: "white", backgroundColor: "black" }}
              />
            </div>
            <div className={styles.containerTwoDefense}>
              <div>RESISTÊNCIA</div>
              <input
                defaultValue={0}
                type="number"
                maxLength={2}
                onInput={handleInput}
                style={{ color: "white", backgroundColor: "black" }}
              />
            </div>
          </div>
          <div className={styles.containerList} style={{height: "25%"}}>
            <div className={styles.containerOneDefense}>
              <div>VONTADE</div>
              <input
                defaultValue={0}
                type="number"
                maxLength={2}
                onInput={handleInput}
              />
            </div>
          </div>
        </div>
      </section>
      <section className={styles.containerIcon}>
        {utils && (
          <>
            <div className={styles.containerSpan}>
              <span className="material-symbols-outlined">delete</span>
            </div>
            <div className={styles.containerSpan}>
              <span className="material-symbols-outlined">recenter</span>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
