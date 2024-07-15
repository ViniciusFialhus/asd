"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
interface GenericProps {
  readonly type: string;
  readonly height: string | number;
  readonly width: string | number;
  readonly setBeingDragged: any;
  readonly setDragItem: any;
}

export default function GenericDivSelect({
  type,
  height,
  width,
  setBeingDragged,
  setDragItem,
}: GenericProps) {
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
    e.dataTransfer.setData('type', "hability");
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
      className={styles.isMain}
      style={{
        height: height,
        width: width,
        cursor: mouseDown ? "grabbing" : "grab"
      }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <section className={styles.containerBase}>
        <div className={styles.containerText}>{type}</div>
        <div className={styles.containerInput}>
        </div>
      </section>
    </main>
  );
}
