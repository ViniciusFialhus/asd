"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
interface DefensesDivProps {
  readonly height: string | number;
  readonly width: string | number;
  readonly setBeingDragged: any;
  readonly setDragItem: any;
}

export default function ExpertiseDivSelect({
  height,
  width,
  setBeingDragged,
  setDragItem,
}: DefensesDivProps) {
  const [mouseDown, setMouseDown] = useState(false);
  const [items, setItems] = useState<string[]>([]);
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
    e.dataTransfer.setData("type", "expertise");
    setBeingDragged(true);
    setDragItem(e.target as HTMLElement);
  };
  const handleDragEnd = (e: React.DragEvent) => {
    setBeingDragged(false);
    setMouseDown(false);
  };

  const addItem = (item: string) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  return (
    <div
      draggable
      className={styles.main}
      style={{
        height: height,
        width: width,
        cursor: mouseDown ? "grabbing" : "grab",
      }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <section className={styles.containerBase}>
        <div className={styles.containerText}>PERÍCIAS</div>
        <div className={styles.containerContent}>
          <select onChange={(e) => addItem(e.target.value)} defaultValue="">
            <option value="" disabled>
              Selecione uma Péricia
            </option>
          </select>
        </div>
      </section>
    </div>
  );
}
