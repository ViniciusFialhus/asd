"use client";
import styles from "./page.module.css";
import { ChangeEvent, useState, useEffect } from "react";
interface AttacksDivProps {
  readonly height: string | number;
  readonly width: string | number;
  readonly setBeingDragged: any;
  readonly setDragItem: any;
}

export default function AttacksDivSelect({
  height,
  width,
  setBeingDragged,
  setDragItem,
}: AttacksDivProps) {
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length > 2) {
      e.target.value = value.slice(0, 2);
    }
  };

  const [mouseDown, setMouseDown] = useState(false);
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
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("type", "attack");
    setBeingDragged(true);
    setDragItem(e.target as HTMLElement);
  };
  const handleDragEnd = (e: React.DragEvent) => {
    setBeingDragged(false);
    setMouseDown(false);
  };

  return (
    <main
      draggable
      className={styles.main}
      style={{
        minHeight: height,
        width: width,
        cursor: mouseDown ? "grabbing" : "grab",
      }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className={styles.containerNameType}>ATAQUE</div>
      <div className={styles.containerNameInput}>
        <div className={styles.containerInitiative}>
          <div>INICIATIVA +</div>
          <div style={{marginLeft: "1vh"}}>0</div>
        </div>
      </div>
    </main>
  );
}
