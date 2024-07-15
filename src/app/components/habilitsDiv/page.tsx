"use client";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
interface HabilityDivProps {
  readonly height: string | number;
  readonly width: string | number;
  readonly setBeingDragged: any;
  readonly setDragItem: any;
}

export default function HabilityDivSelect({
  height,
  width,
  setBeingDragged,
  setDragItem,
}: HabilityDivProps) {
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
    e.dataTransfer.setData("type", "hability");
    setBeingDragged(true);
    setDragItem(e.target as HTMLElement);
  };
  const handleDragEnd = (e: React.DragEvent) => {
    setBeingDragged(false);
    setMouseDown(false);
  };
  return (
    <div
      draggable
      className={styles.containerHabilits}
      style={{
        height: height,
        width: width,
        cursor: mouseDown ? "grabbing" : "grab",
      }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className={styles.containerHabilty}>
        <div className={styles.containerName}>FORÇA</div>
        <div className={styles.containerFakeInput}>0</div>
      </div>
      <div className={styles.containerHabilty}>
        <div className={styles.containerName}>AGILIDADE</div>
        <div className={styles.containerFakeInput}>0</div>
      </div>
      <div className={styles.containerHabilty}>
        <div className={styles.containerName}>LUTA</div>
        <div className={styles.containerFakeInput}>0</div>
      </div>
      <div className={styles.containerHabilty}>
        <div className={styles.containerName}>PRONTIDÃO</div>
        <div className={styles.containerFakeInput}>0</div>
      </div>
      <div className={styles.containerHabilty}>
        <div className={styles.containerName}>VIGOR</div>
        <div className={styles.containerFakeInput}>0</div>
      </div>
      <div className={styles.containerHabilty}>
        <div className={styles.containerName}>DESTREZA</div>
        <div className={styles.containerFakeInput}>0</div>
      </div>
      <div className={styles.containerHabilty}>
        <div className={styles.containerName}>INTELECTO</div>
        <div className={styles.containerFakeInput}>0</div>
      </div>
      <div className={styles.containerHabilty}>
        <div className={styles.containerName}>PRESENÇA</div>
        <div className={styles.containerFakeInput}>0</div>
      </div>
    </div>
  );
}
